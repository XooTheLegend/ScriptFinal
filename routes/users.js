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
    password: Joi.string().trim().min(8).max(100).required(),
    tip:Joi.string().trim().min(2).max(20).required(),
    name:Joi.string().trim().min(4).max(20).required(),
    surname:Joi.string().trim().min(4).max(20).required()

});

const sema2 = Joi.object().keys({
    email:Joi.string().trim().min(4).max(20).required(),
    password:Joi.string().trim().min(8).max(64).required()
});

const route = express.Router();

route.use(express.json());

route.post('/login',(req,res)=>{
    let {error} = Joi.validate(req.body, sema2);
    if(error){
        res.status(400).send(error.details[0].message);
    }else {
        const email = req.body.email;
        const password = crypto.createHash('sha256').update(req.body.password).digest('hex');

        let user = null;

        let query = 'select * from korisnici where email=?';
        let formated = mysql.format(query, [email]);

        pool.query(formated, (err, rows) => {
            if (err) {
                res.status(500).send(error.sqlMessage);
            } else {
                user = rows[0];
                if (user != null && password === user.password) {
                    jwt.sign({user: user}, "secretkey", (err, jwt) => {
                        res.json({
                            jwt
                        });
                    });
                } else {
                    //console.log('Pogresan password/email')
                    res.status(404).send("Pogresan email/password")
                }
            }
        });
    }
});


function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //bice undefined ili token
    if(token==null) return res.sendStatus(401);

    jwt.verify(token,'secretkey',(err,user)=>{
        const decodedToken = jwt.decode(token,{
            complete:true
        });
        const u = decodedToken.payload.user;
        if(err || u.tip==='CONTENT_CREATOR') return res.sendStatus(403); //ima token ali nije validan
        req.user = user;
        next();
    });

}

route.get('/users',authenticateToken, (req, res)=>{

    pool.query('select * from korisnici', (err, rows)=>{
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.post('/users',authenticateToken, (req,res) => {
    let {error} = Joi.validate(req.body, sema);

    if(error){
        res.status(400).send(error.details[0].message);
    }else{
        let query = 'insert into korisnici (email, password, tip, name, surname) values (?,?,?,?,?)';
        const pw = crypto.createHash('sha256').update(req.body.password).digest('hex');
        let formated = mysql.format(query, [req.body.email, pw, req.body.tip, req.body.name, req.body.surname]);

        pool.query(formated, (err,response) =>{
            if(err){
                res.status(500).send(err.sqlMessage);
            } else {
                query = 'select * from korisnici where id=?';
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

route.get('/user/:id([0-9]+)?/', authenticateToken, (req,res) =>{

    let query = 'select * from korisnici where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) => {
        if(err){
            res.status(500).send(error.sqlMessage);
        }else{
            if(rows.length === 0){
                res.status(404).send('User not found!');
            }else{
                res.send(rows[0]);
            }
        }
    });
});

route.put('/user/:id([0-9]+)?/', authenticateToken, (req,res) => {
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
                        if(rows.length===0){
                            res.status(404).send('User not found!');
                        }else{
                            res.send(rows[0]);
                        }
                    }
                });
            }
        });
    }
});

route.delete('/user/:id([0-9]+)?/', authenticateToken, (req,res) => {
    let query = 'select * from korisnici where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) =>{
        if(err){
            res.status(500).message(err.sqlMessage);
        } else {
            let user = rows[0];
            if (typeof user === 'undefined') {
                res.status(404).send('User not found!');
            }else{
                let query = 'delete from korisnici where id=?';
                let formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(user);

                });
            }
        }
    });
});

module.exports = route;