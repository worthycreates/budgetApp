import express from 'express';
// Using "import type" for interfaces/types to satisfy the strict compiler rules
import type { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = 3000;

// Enable JSON parsing so the backend can read the data sent from the frontend.
app.use(express.json());

// Initialize the SQLite database (creates a file named 'budget.db' if it does not exist).
const db = new sqlite3.Database('./budget.db', (err) => {
  if (err) {
    console.error('Error opening database: ', err.message);
  } else {
    console.log('Successfully connected to the SQLite database.');
  }

  // Creating a simple table to verify that it works.
  db.run(`CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY)`);
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
  res.json({ status: 'Backend is running smoothy!'});
});

// Start the server.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//Would you like to move straight into creating your actual budget database tables, or would you prefer to look at how to structure your API routes next?