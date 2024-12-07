const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Imports db.js for database connection
const routes = require('./routes'); // Imports CRUD routes

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes); // Prefix for all API routes

app.listen(5000, () => {
   console.log("Server running on http://localhost:5000");
});
