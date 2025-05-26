// server.js
const express = require('express');
const next = require('next');

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();



server.get('/external', (req, res) => {
  const referrer = '/previous-step';
  const token = '123';
   const redirectUrl = `http://localhost:3000${referrer}?referrer=${encodeURIComponent(referrer)}&token=${encodeURIComponent(token)}`;
  res.redirect(redirectUrl);
});

  server.listen(port, () => {
    console.log(`Servidor en: http://localhost:${port}/external`);
  });
});
