const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'skript_baza'
});

const sema = Joi.object().keys({
    email: Joi.string().trim().min(4).max(20).required(),
    password: Joi.string().trim().min(1).max(100).required(),
    tip:Joi.string().trim().min(2).max(20).required(),
    name:Joi.string().trim().min(4).max(20).required(),
    surname:Joi.string().trim().min(4).max(20).required()

});

const route = express.Router();

route.use(express.json());

route.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = crypto.createHash('sha256').update(req.body.password).digest('hex');

    let user=null;

    let query = 'select * from korisnici where email=?';
    let formated = mysql.format(query, [email]);

    pool.query(formated, (err,rows) => {
        if(err){
            res.status(500).send(error.sqlMessage);
        }else{
            user = rows[0];
            if(user != null && password === user.password){
                jwt.sign({user:user}, "secretkey", (err,jwt)=>{
                    res.json({
                        jwt
                    });
                });
            } else {
                res.status(500).send("Korisnik ne postoji")
            }
        }
    });

});

route.get('/users', (req, res)=>{
    pool.query('select * from korisnici', (err, rows)=>{
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.post('/users', (req,res) => {
    let {error} = Joi.validate(req.body, sema);

    if(error){
        res.status(400).send(error.details[0].message);
    }else{
        let query = 'insert into korisnici (email, password, tip, name, surname) values (?,?,?,?,?)';
        const pw = crypto.createHash('sha256').update(req.body.password).digest('hex');
        let formated = mysql.format(query, [req.body.email, pw, req.body.tip, req.body.name, req.body.surname]);

        pool.query(formated, (err) =>{
            if(err){
                res.status(500).send(err.sqlMessage);
            } else {
                res.send("user created");
                // query = 'select * from korisnici where id=?';
                // formated = mysql.format(query, [response.insertId]);
                //
                // pool.query(formated, (err,rows) => {
                //     if(err){
                //         res.status(500).send(error.sqlMessage);
                //     }else{
                //         res.send(rows[0])
                //     }
                // });
            }
        });
    }
});

route.get('/user/:id', (req,res) =>{

    let query = 'select * from korisnici where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) => {
        if(err){
            res.status(500).send(error.sqlMessage);
        }else{
            res.send(rows[0])
        }
    });
});

route.put('/user/:id', (req,res) => {
    let {error} = Joi.validate(req.body, sema);

    if(error){
        res.status(400).send(error.details[0].message);
    }else{
        let query = 'update korisnici set email=?, password=?, tip=?, name=?, surname=? where id=?';
        let formated = mysql.format(query, [req.body.email, req.body.password, req.body.tip, req.body.name, req.body.surname, req.params.id]);

        pool.query(formated, (err,response) =>{
            if(error){
                response.status(500).send(err.sqlMessage);
            } else {
                query = 'select * from korisnici where id=?';
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

route.delete('/user/:id', (req,res) => {
    let query = 'select * from korisnici where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) =>{
        if(err){
            res.status(500).message(err.sqlMessage);
        } else {
            let user = rows[0];
            let query = 'delete from korisnici where id=?';
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