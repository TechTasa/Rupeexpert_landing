const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { connect} = require('./config/db');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const loanRoutes = require('./routes/loanRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
// Connect Database
connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
  });

  app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    store: store
  }));
  
  app.use('/auth', authRoutes);

  app.use('/loan', loanRoutes);

  app.use('/dashboard', dashboardRoutes);

  app.use('/dashboard', userRoutes);

  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
