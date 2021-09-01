const express = require('express')
const news = require('./routes/news')
const users = require('./routes/users')
const comments = require('./routes/comments')
const path = require('path');
const history = require('connect-history-api-fallback')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const cookies = require('./routes/cookies')

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());
app.use(cookieParser());

app.use('/api', users,news,comments,cookies);

app.get('/cookie',(req,res)=>{
        let r = (Math.random() + 1).toString(36).substring(2);
        res.json({
            cookie:r
        })
})

const staticDir = express.static(path.join(__dirname, 'dist'));

app.use(staticDir);
app.use(history());
app.use(staticDir);


app.listen(8080);