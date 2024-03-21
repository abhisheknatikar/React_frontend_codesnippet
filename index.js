const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 6150;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'root@143',
  database: 'submission_db',
});


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});


app.use(express.json());




app.post('/submissions', (req, res) => {
  const { username, submission } = req.body;
  const sql = 'INSERT INTO submissions (username, submission) VALUES (?, ?)';
  db.query(sql, [username, submission], (err, result) => {
    if (err) {
      console.error('Error saving submission:', err);
      res.status(500).json({ error: 'Failed to save submission' });
    } else {
      res.status(201).json({ message: 'Submission saved successfully' });
    }
  });
});


app.get('/submissions', (req, res) => {
  const sql = 'SELECT * FROM submissions';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching submissions:', err);
      res.status(500).json({ error: 'Failed to fetch submissions' });
    } else {
      res.status(200).json(results);
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
