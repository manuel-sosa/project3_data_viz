// app_combined.js
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

// Route to fetch hospital names for the dropdown
app.get('/api/hospital_names', async (req, res) => {
    try {
        const query = `SELECT hospitalname FROM hospital_data`;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

// Route to fetch hospital data for pie chart
app.get('/api/hospital_data_pie/:hospitalname', async (req, res) => {
    const { hospitalname } = req.params;
    try {
        const query = `
            SELECT
                SUM(NETRV_MCAR_TR) AS total_trad,
                SUM(NETRV_MCAR_MC) AS total_medi_mang,
                SUM(NETRV_MCAL_TR) AS total_medi_cal_trad,
                SUM(NETRV_MCAL_MC) AS total_medi_cal_mang,
                SUM(NETRV_CNTY) AS total_county_indi_trad_mang,
                SUM(NETRV_THRD_TR) AS total_other_trad,
                SUM(NETRV_THRD_MC) AS total_other_mang,
                SUM(NETRV_OTH_IND) AS total_other_indi,
                SUM(NETRV_OTH) AS total_other_pay,
                (SUM(NETRV_MCAR_TR) + SUM(NETRV_MCAR_MC) + SUM(NETRV_MCAL_TR) + SUM(NETRV_MCAL_MC) + SUM(NETRV_CNTY) + SUM(NETRV_THRD_TR) + SUM(NETRV_THRD_MC) + SUM(NETRV_OTH_IND) + SUM(NETRV_OTH)) AS total_paid
            FROM
                hospital_data
            WHERE
                hospitalname = $1
            GROUP BY
                hospitalid
        `;
        const result = await pool.query(query, [hospitalname]); // Use parameterized query
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Hospital not found.' });
        }
        res.json(result.rows[0]); // Assuming only one row is expected for the pie chart
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while fetching data for pie chart.' });
    }
});

// Route to fetch hospital data and calculate total capacity for specific columns
app.get('/api/hospital_data_bar/:hospitalname', async (req, res) => {
    const { hospitalname } = req.params;
    try {
        // Proceed with fetching data if hospitalId is valid
        const query = `
            SELECT
                SUM(DIS_ACUTE) AS total_acute,
                SUM(DIS_PSYCH) AS total_psych,
                SUM(DIS_CHEM) AS total_chem,
                SUM(DIS_REHAB) AS total_rehab,
                SUM(DIS_LTC) AS total_ltc,
                SUM(DIS_RESDNT) AS total_resdnt
            FROM
                hospital_data
            WHERE
                hospitalname = $1
        `;
        const result = await pool.query(query, [hospitalname]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Hospital not found.' });
        }
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public_combined'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});