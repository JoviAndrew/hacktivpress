require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/hacktivpress`);

const homeRoute = require('./routers/home_route.js')
const indexRoute = require('./routers/index_route.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/index', indexRoute);

app.use('/home', homeRoute)


app.listen(3000, () => {
    console.log(`listening on port 3000`);
})