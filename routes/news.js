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
    title: Joi.string().trim().min(4).max(20).required(),
    author: Joi.string().trim().min(1).max(20).required(),
    content:Joi.string().trim().min(20).max(200).required()

});

const route = express.Router();

route.use(express.json());


route.get('/news', (req, res)=>{
    pool.query('select * from vesti', (err, rows)=>{
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.post('/news', (req,res) => {
    let {error} = Joi.validate(req.body, sema);

    if(error){
        res.status(400).send(error.details[0].message);
    }else{
        let query = 'insert into vesti (author, title, content) values (?,?,?)';
        let formated = mysql.format(query, [req.body.author, req.body.title, req.body.content]);

        pool.query(formated, (err,response) =>{
            if(error){
                res.status(500).send(error.sqlMessage);
            } else { //moze i bez ovoga, npr samo res.send(user added);
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

route.get('/new/:id', (req,res) =>{

    let query = 'select * from vesti where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) => {
        if(err){
            res.status(500).send(error.sqlMessage);
        }else{
            res.send(rows[0])
        }
    });
});

route.put('/new/:id', (req,res) => {
    let {error} = Joi.validate(req.body, sema);

    if(error){
        res.status(400).send(error.details[0].message);
    }else{
        let query = 'update vesti set author=?, title=?, content=? where id=?';
        let formated = mysql.format(query, [req.body.author, req.body.title, req.body.content, req.params.id]);

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
                        res.send(rows[0])
                    }
                });
            }
        });
    }
});

route.delete('/new/:id', (req,res) => {
    let query = 'select * from vesti where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) =>{
        if(err){
            res.status(500).message(err.sqlMessage);
        } else {
            let user = rows[0];
            let query = 'delete from vesti where id=?';
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(user);

            });
        }
    });
});

module.exports = route;