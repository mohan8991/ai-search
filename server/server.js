// server.js
const express = require('express');
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const db = require('./db');

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:5173'] // Whitelist the domains you want to allow
};

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(corsOptions)); // Use the cors middleware with your options

// Example endpoint
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
