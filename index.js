require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const port = process.env.PORT || 8080;
const DBConnector = require('./config/DB');
const router = require('./routes/contact_route');
const app = express();
// Database function
DBConnector();

// Setting view engines
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(router);


// Home Route
app.get('/', (req, res) => {
  res.render('index.ejs');
})



app.listen(port, () =>  console.log(`Server running on Port ${port}`));