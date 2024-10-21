const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for frontend URL
app.use(cors({
  origin: 'https://friendly-space-tribble-vrpxq5wg66v2p9px-3000.app.github.dev',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Root URL handler
app.get('/', (req, res) => {
  res.send('Project Tracker Backend is running');
});


// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Get all projects
app.get('/projects', (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new project
app.post('/projects', (req, res) => {
  const { name, description, status } = req.body;
  if (!name || !description || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  db.query('INSERT INTO projects (name, description, status) VALUES (?, ?, ?)', 
  [name, description, status], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ id: result.insertId });
  });
});


// Update a project
app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  db.query('UPDATE projects SET name = ?, description = ?, status = ? WHERE id = ?', [name, description, status, id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Delete a project
app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM projects WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
