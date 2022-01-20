
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mainRoute = require('./routes/mainRoutes');
require('./models/db');
const appdata = require('./appdata');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(mainRoute);
appdata.appData();
port = 3000;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}.`);
});