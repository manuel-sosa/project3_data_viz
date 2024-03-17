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
  
  // Route to fetch hospital data and calculate total capacity for specific columns
  app.get('/api/hospital_data/:hospitalId', async (req, res) => {
    const { hospitalId } = req.params;
    try {
      // Proceed with fetching data if hospitalId is valid
      const query = `
        SELECT
          hospitalid,
          SUM(DIS_ACUTE) AS total_acute,
          SUM(DIS_PSYCH) AS total_psych,
          SUM(DIS_CHEM) AS total_chem,
          SUM(DIS_REHAB) AS total_rehab,
          SUM(DIS_LTC) AS total_ltc,
          SUM(DIS_RESDNT) AS total_resdnt,
          (SUM(DIS_ACUTE) + SUM(DIS_PSYCH) + SUM(DIS_CHEM) + SUM(DIS_REHAB) + SUM(DIS_LTC) + SUM(DIS_RESDNT)) AS total_capacity
        FROM
          hospital_data
        WHERE
          hospitalid = $1
        GROUP BY
          hospitalid
      `;
      const result = await pool.query(query, [hospitalId]); // Provide hospitalId as a parameter
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
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});