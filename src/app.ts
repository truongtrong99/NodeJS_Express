// const express = require('express');
import express from 'express';
import 'dotenv/config'; // Automatically loads environment variables from .env file
const app = express();
const port = process.env.PORT || 8080; // Use PORT from .env or default to 3000

app.get('/', (req, res) => {
  res.send('Hello World nodemon!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("check env port: ", process.env.PORT);
})
