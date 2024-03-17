// app.js

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Database configuration
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'california_hospitals_db',
  });

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to fetch hospital data based on selection
app.get('/api/hospital_data/:facNo', async (req, res) => {
  const { hospitalid } = req.params;
  try {
    const query = `SELECT * FROM hospital_data`;
    const result = await pool.query(query, [hospitalid]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// Route to fetch hospital IDs for the dropdown
app.get('/api/hospital_ids', async (req, res) => {
    try {
      const query = `SELECT hospitalid FROM hospital_data`;
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  });

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
