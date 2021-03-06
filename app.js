const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// connect to mongo db
mongoose.connect('mongodb+srv://vince:vince@boutik-qvvyg.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', require('./routes/stuff'));
app.use('/api/auth', require('./routes/user'));

module.exports = app;
