// Import required modules
const express = require('express');
const cors = require('cors'); 
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());

// Database connection configuration
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'california_hospitals_db',
});

// Query to select all data from a table
const query = 
    SELECT DIS_ACUTE, DIS_PSYCH, DIS_CHEM, DIS_REHAB, DIS_RESDNT 
    DIS_ACUTE + DIS_PSYCH + DIS_CHEM + DIS_REHAB + DIS_RESDNT AS total 
    FROM hospital_data;
;
// Execute the query
pool.query(query, (err, result) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }

    // Log the query result
    console.log('Query result:', result.rows);
    
    // Release the client back to the pool
    pool.end();
});

// // Route to handle incoming requests
// app.get('/data', (req, res) => {
//     // Execute a database query
//     pool.query('SELECT * FROM hospital_data', (err, result) => {
//         if (err) {
//             console.error('Error executing query:', err);
//             res.status(500).send('Internal server error');
//             return;
//         }

//         // Send the query result as JSON
//         res.json(result.rows);
//     });
// });

//       // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);

// });

// // Route to fetch data from the database
// app.get('/data', (req, res) => {
//     pool.query('SELECT * FROM hospital_data', (err, result) => {
//         if (err) {
//             console.error('Error executing query', err);
//             res.status(500).send('Internal server error');
//             return;
//         }
//         res.json(result.rows);
//     });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

// // SQL query to fetch data
// const sqlQuery = 'SELECT DIS_ACUTE, SUM(value) AS total FROM hospital_data GROUP BY category';

// // Connect to the database and execute query
// client.query(sqlQuery, (err, result) => {
//   if (err) {
//     console.error('Error executing query', err);
//     return;
//   }

//   // Extract data from query result
//   const categories = result.rows.map(row => row.category);
//   const counts = result.rows.map(row => row.count);

//   // Create Plotly pie chart data
//   const data = [{
//     labels: categories,
//     values: counts,
//     type: 'pie'
//   }];

//   // Specify layout options for the chart
//   const layout = {
//     title: 'Type of Care'
//   };

//   // Create the chart using Plotly
//   plotly.plot(data, layout, (err, msg) => {
//     if (err) {
//       console.error('Error creating chart', err);
//       return;
//     }

// });