const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('data.db');

app.use(cors());
app.use(express.json());

db.exec(`CREATE TABLE IF NOT EXISTS internships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  company TEXT,
  location TEXT,
  description TEXT
)`);

db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
)`);

app.get('/api/internships', (req, res) => {
  const rows = db.prepare('SELECT * FROM internships').all();
  res.json(rows);
});

app.post('/api/internships', (req, res) => {
  const { title, company, location, description } = req.body;
  const result = db.prepare(
    'INSERT INTO internships (title, company, location, description) VALUES (?, ?, ?, ?)'
  ).run(title, company, location, description);
  res.json({ id: result.lastInsertRowid });
});

app.post('/api/signup', (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.json({ success: false, message: 'Email already registered!' });
  }

  db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)')
    .run(name, email, password, role);

  res.json({ success: true, message: 'Signup successful!' });
});

app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ? AND role = ?')
                 .get(email, password, role);

  if (user) {
    res.json({ success: true, role: user.role, name: user.name });
  } else {
    res.json({ success: false, message: 'Invalid email, password or role!' });
  }
});


app.get('/api/users', (req, res) => {
    const users = db.prepare('SELECT id, name, email, role FROM users').all();
    res.json(users);
});


app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});