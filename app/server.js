const jsonServer = require('json-server');
const express = require('express');
const cors = require('cors');

const app = express();
const server = jsonServer.create();

app.use(cors());

const router = jsonServer.router('./_data/db.json');

app.use('/', router);

const port = 4000; // or any other port you prefer
app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
