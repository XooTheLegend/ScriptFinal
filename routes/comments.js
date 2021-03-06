const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'skript_baza'
});

const sema = Joi.object().keys({
    author: Joi.string().trim().min(4).max(20).required(),
    content: Joi.string().trim().min(20).max(100).required(),
    news: Joi.number().min(1).max(200).required()
});

const route = express.Router();

route.use(express.json());

route.get('/comment/:id([0-9]+)?/', (req,res) =>{
    let query = 'select * from komentari where news=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) => {
        if(err){
            res.status(500).send(error.sqlMessage);
        }else{
            res.send(rows)
        }
    });
});

route.post('/comments', (req,res) => {
    let {error} = Joi.validate(req.body, sema);

    if(error){
        res.status(400).send(error.details[0].message);
    }else{
        let query = 'insert into komentari (author, content, news) values (?,?,?)';
        let formated = mysql.format(query, [req.body.author, req.body.content, req.body.news]);

        pool.query(formated, (err,response) =>{
            if(error){
                res.status(500).send(error.sqlMessage);
            } else {
                query = 'select * from komentari where id=?';
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

route.delete('/comments/:id', (req,res) => {
    let query = 'delete from komentari where news=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) =>{
        if(err){
            res.status(500).message(err.sqlMessage);
        } else {
            res.status(200).send('Comments are deleted');
        }
    });
});

module.exports = route;