// server.js
const express = require('express');
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const db = require('./db');
const { askAi } = require('./ai'); // Import the function from ai.js

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

app.post('/ai_search', async (req, res) => {
  // const question = 'what is the capital of France?'; // TODO: fix this later
  try {
    const answer = await askAi(req.body.query);
    res.json({ answer });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Failed to get completion' });
    console.error('Error calling OpenAI API:', error);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
