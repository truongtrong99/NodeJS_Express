// const express = require('express');
import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World updated!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
