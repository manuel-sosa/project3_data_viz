const express = require('express');
const { Pool } = require('pg');
const NodeGeocoder = require('node-geocoder');
const path = require('path');

// Create Express app
const app = express();
const port = 3000;

// Database connection configuration
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'california_hospitals_db',
});

// Configure geocoder
const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: 'AIzaSyDrazJPLQhdITRBSkDVbGQrREJpHzMohfY',
});

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'mapping' directory
app.use(express.static(path.join(__dirname, 'mapping')));

// Set MIME type for JavaScript files
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.type('application/javascript');
    }
    next();
});

// Route handler for serving the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to fetch hospital location by name
app.get('/hospital_location', async (req, res) => {
    try {
        const query = 'SELECT hospitalname FROM hospital_data'; // Adjust the query to fetch hospital names
        const result = await pool.query(query);

        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).send('No hospitals found');
        }
    } catch (err) {
        console.error('Error fetching hospital names:', err);
        res.status(500).send('Error fetching hospital names');
    }
});
app.get('/hospital_location', async (req, res) => {
    const { hospitalname } = req.query;

    try {
        // Fetch address, city, and zip_code from the database
        const query = 'SELECT address, city, zip_code FROM hospital_data WHERE hospitalname = $1';
        const result = await pool.query(query, [hospitalname]);

        if (result.rows.length > 0) {
            const { address, city, zip_code } = result.rows[0];
            const location = `${address}, ${city}, ${zip_code}`;

            // Geocode the address
            const geoData = await geocoder.geocode(location);

            if (geoData.length > 0) {
                const { latitude, longitude } = geoData[0];
                res.json({ latitude, longitude });
            } else {
                res.status(404).send('Location not found');
            }
        } else {
            res.status(404).json({ error: 'Hospital not found' });
        }
    } catch (err) {
        console.error('Error fetching hospital location:', err);
        res.status(500).send('Error fetching hospital location');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
