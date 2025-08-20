// const express = require('express');
import express from 'express';
import 'dotenv/config'; // Automatically loads environment variables from .env file
import webRoutes from 'src/routes/web';
import initDataBase from 'config/seed';
import passport from 'passport';
import configPassportLocal from 'src/middleware/passport.local';
import session from 'express-session';
const app = express();
const port = process.env.PORT || 8080; // Use PORT from .env or default to 3000
//config view engine
app.set('view engine', 'ejs');
app.set('views',  __dirname + '/views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///config static files
app.use(express.static('public'));

///Config session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
//config passport
app.use(passport.initialize());
configPassportLocal()

webRoutes(app);

//seeding data
initDataBase();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("check env port: ", process.env.PORT);
})
