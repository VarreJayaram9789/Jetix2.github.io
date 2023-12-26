const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
// Use the routes from index.js

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // replace with your MySQL password
  database: 'JetixDB',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile('/public/Play_Test.html');
});

// API endpoint to search for timestamps
app.get('/api/search', (req, res) => {
  const { keyword } = req.query;

  const query = `SELECT * FROM timestamps WHERE keyword LIKE '%${keyword}%'`;


  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:${PORT}");
});