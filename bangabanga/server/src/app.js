var express = require('express');
var router = express.Router();

const app = express();

/* GET home page. */

app.get('/', async function(req, res, next) {
res.send('hello, wolrd!')

});

module.exports = app;
