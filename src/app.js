require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.routes.js');
const cors = require('cors');
const app = express();

// setings
app.set('PORT', process.env.PORT || 4000);
app.set('KEY', process.env.KEY);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api', routes);

module.exports = app;
