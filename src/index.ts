import express from 'express';
// Using "import type" for interfaces/types to satisfy the strict compiler rules
import type { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = 3000;

// Enable JSON parsing so the backend can read the data sent from the frontend.
app.use(express.json());

// Initialize the SQLite database (creates a file named 'budget.db' if it does not exist).
const db = new sqlite3.Database('budgetApp.db', (err) => {
  if (err) {
    console.error('Error opening database: ', err.message);
    return;
  } 
    
  console.log('Successfully connected to the SQLite database.');

  // Enable Foreign Key constraint explicitly.
  db.run(`PRAGMA foreign_keys = ON`);

  // Using exec to execute multiple queries.
  db.exec(`
    CREATE TABLE IF NOT EXISTS wallets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      balance REAL NOT NULL DEFAULT 0.0
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wallet_id INTEGER,
      name TEXT NOT NULL,
      budget_limit REAL NOT NULL,
      FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      frequency TEXT NOT NULL DEFAULT monthly,
      start_date TEXT NOT NULL,
      end_date TEXT
    );

    CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      subscription_id INTEGER,
      amount REAL NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      notes TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
      FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS setting_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      is_sub_notification_active INTEGER NOT NULL DEFAULT 0,
      is_sub_approve_notification_active INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      setting_profile_id INTEGER NOT NULL,
      FOREIGN KEY (setting_profile_id) REFERENCES setting_profiles (id) ON DELETE CASCADE
    );
  `, (execErr) => {
    if (execErr) {
      console.error('Error creating tables:', execErr.message);
    } else {
      console.log('Database tables verified/created successfully.');
    }
  });
});

// First REST API endpoint.
app.get('/', (req: Request, res: Response) => {
  // res.render("home");
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home</title>
        <style>
          * {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
        </style>
      </head>
      <body>
        <h1>Testing</h1>
        <a href="/api/health">
          <button>View Health</button>
        </a>
      </body>
    </html>
    `)
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Backend is running smoothy!' });
});

// GET /api/wallets
app.get('/api/wallets', (req: Request, res: Response) => {
  res.json({ status: 'view wallets here.' })
});

// POST /api/wallets
app.post('/api/wallets', (req: Request, res: Response) => {
  res.json({ status: 'add wallet here' });
});

// Start the server.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


