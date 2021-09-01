const express = require('express');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'skript_baza'
});

const route = express.Router();

route.use(express.json());

route.post('/check-cookie',(req,res)=>{
    const value = req.body.value
    const newsId = req.body.news

    let query = 'select * from cookies where value=? and newsId=?';
    let formated = mysql.format(query, [value,newsId]);
    pool.query(formated,(err,rows)=>{
        if(err){
            res.status(500).send(err.sqlMessage);
        }else{
            //console.log(rows.length);
            if(rows.length===0){
                query = 'update vesti set count = count + 1 where id=?';
                //query = 'insert into cookies (value, newsId) values (?,?)';
                formated = mysql.format(query, [newsId]);
                pool.query(formated,(err)=>{
                    if(err){
                        res.status(500).send(err.sqlMessage);
                    }else{
                        //res.send('Uspesno dodat cookie');
                        //query = 'update vesti set count = count + 1 where newsId=?';
                        query = 'insert into cookies (value, newsId) values (?,?)';
                        formated = mysql.format(query, [value,newsId]);
                        pool.query(formated,(err)=>{
                            if(err){
                                res.status(500).send(err.sqlMessage);
                            }else{
                                res.send('Succesfully incremented count')
                            }
                        })
                    }
                })
            } else{
                res.send('User Already viewed')
            }
        }
    })

});

module.exports = route;