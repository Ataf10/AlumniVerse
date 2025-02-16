const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config()
const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log("Server on!")
})