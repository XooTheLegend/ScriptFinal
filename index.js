const express = require('express')
const users = require('./routes/users')
const news = require('./routes/news')
const path = require('path');
const history = require('connect-history-api-fallback')

const index = express();

index.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

index.use('/api', users,news); //xd rly

const staticDir = express.static(path.join(__dirname, 'dist'));

index.use(staticDir);
index.use(history());
index.use(staticDir);


index.listen(8080);