const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');
const jwt = require('jsonwebtoken')

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'skript_baza'
});

const sema = Joi.object().keys({
    title: Joi.string().trim().min(4).max(20).required(),
    author: Joi.string().trim().min(1).max(20).required(),
    content:Joi.string().trim().min(20).max(200).required(),
    category:Joi.string().trim().min(2).max(20).required()

});

const route = express.Router();

route.use(express.json());

function authenticateTokenNews(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //bice undefined ili token
    if(token==null) return res.sendStatus(401);

    jwt.verify(token,'secretkey',(err,user)=>{
        if(err) return res.sendStatus(403); //ima token ali nije validan
        req.user = user;
        next();
    });

}

route.get('/news', (req, res)=>{
    pool.query('select * from vesti', (err, rows)=>{
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.post('/news',authenticateTokenNews, (req,res) => {
    let {error} = Joi.validate(req.body, sema);

    if(error){
        res.status(400).send(error.details[0].message);
    }else{
        let query = 'insert into vesti (author, title, content, category) values (?,?,?,?)';
        let formated = mysql.format(query, [req.body.author, req.body.title, req.body.content, req.body.category]);

        pool.query(formated, (err,response) =>{
            if(error){
                res.status(500).send(error.sqlMessage);
            } else {
                query = 'select * from vesti where id=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err,rows) => {
                    if(err){
                        res.status(500).send(error.sqlMessage);
                    }else{
                        res.send(rows[0])
                    }
                });
            }
        });
    }
});

route.get('/new/:id([0-9]+)?/', (req,res) =>{

    let query = 'select * from vesti where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) => {
        if(err){
            res.status(500).send(error.sqlMessage);
        }else{
            if(rows.length===0){
                res.status(404).send('Page not found!')
            }else{
                res.send(rows[0]);
            }
        }
    });
});

route.put('/new/:id([0-9]+)?/', authenticateTokenNews, (req,res) => {
    let {error} = Joi.validate(req.body, sema);

    if(error){
        res.status(400).send(error.details[0].message);
    }else{
        let query = 'update vesti set author=?, title=?, content=?, category=? where id=?';
        let formated = mysql.format(query, [req.body.author, req.body.title, req.body.content,req.body.category, req.params.id]);

        pool.query(formated, (err,response) =>{
            if(error){
                response.status(500).send(err.sqlMessage);
            } else {
                query = 'select * from vesti where id=?';
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err,rows) => {
                    if(err){
                        res.status(500).send(error.sqlMessage);
                    }else{
                        if(rows.length === 0){
                            res.status(404).send('Page not found!');
                        }else{
                            res.send(rows[0]);
                        }
                    }
                });
            }
        });
    }
});

route.delete('/new/:id([0-9]+)?/', authenticateTokenNews, (req,res) => {
    let query = 'select * from vesti where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) =>{
        if(err){
            res.status(500).message(err.sqlMessage);
        } else {
            let news = rows[0];
            if (typeof news === 'undefined') {
                res.status(404).send('Page not found!');
            } else{
                let query = 'delete from vesti where id=?';
                let formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(news);

                });
            }
        }
    });
});

module.exports = route;