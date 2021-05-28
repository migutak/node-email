var express = require('express');
var app = express();

app.use(express.json());

app.post('/test', (req, res) => {
    res.json({requestBody: req.body})  // <==== req.body will be a parsed JSON object
  })

app.listen(3000);