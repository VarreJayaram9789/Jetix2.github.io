const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const index = require('./index.js');

// Enable CORS for all routes
app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.json());

// MySQL connection configuration
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  insecureAuth: true,
  database: "JetixDB"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// Authentication endpoint
app.post('/login', (req, res) => {
  
  const { email, password } = req.body;

  // Perform a SELECT query to check if the provided credentials are valid
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  con.query(query, [email, password], function (err, result) {
    if (err) {
      console.error('Error during authentication:', err);
      return res.json({ success: false, message: 'An error occurred during login' });
    }

    // Check if the result has any rows, indicating valid credentials
    if (result.length > 0) {
      res.json({ success: true, message: 'Login successful!' });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

