const express = require('express');
const app = express();

app.use(express.json());

//Import all routers
const products = require('./routes/product');

app.use('/api/v1/', products);

module.exports = app;
