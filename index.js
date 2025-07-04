const express = require('express');
const { Client } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

let dbStatus = 'Not connected';

// Attempt to connect to the database if DATABASE_URL is set
if (process.env.DATABASE_URL) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  client.connect()
    .then(() => {
      dbStatus = 'Connected to database!';
      return client.end();
    })
    .catch((err) => {
      dbStatus = `Database connection error: ${err.message}`;
    });
} else {
  dbStatus = 'DATABASE_URL not set';
}

app.get('/', (req, res) => {
  res.send(`
    <h1>Environment Variables</h1>
    <pre>${JSON.stringify(process.env, null, 2)}</pre>
    <h2>Database Status</h2>
    <pre>${dbStatus}</pre>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
