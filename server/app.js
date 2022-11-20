const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload())

// Import all routers
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const category = require('./routes/category');
const subCategory = require('./routes/subCategory');
const discount = require('./routes/discount');
const advertisement = require('./routes/advertisement');
const author = require('./routes/author');

app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', category);
app.use('/api/v1/', subCategory);
app.use('/api/v1/', discount);
app.use('/api/v1/', advertisement);
app.use('/api/v1/', author);

// Middleware to handle error
app.use(errorMiddleware);

module.exports = app;
