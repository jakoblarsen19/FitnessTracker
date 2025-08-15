const http = require('http');
const db = require('./db');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/bookings') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const result = await db.query(
          'INSERT INTO bookings (name, date) VALUES ($1, $2) RETURNING *',
          [data.name, data.date]
        );
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.rows[0]));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to create booking' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
