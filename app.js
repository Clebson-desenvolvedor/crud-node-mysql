const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});


 
const mysql = require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'rootone',
    password:'123456',
    database:'relogios'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM dadosrelogios";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('index', {
            title : 'Cadastros de Relógios',
            relogios : rows
        });
    });
});

app.get('/edit/:id_relogio',(req,res) => {
    const id_relogio = req.params.id_relogio;
    let sql = `SELECT * FROM dadosrelogios where id_relogio = ${id_relogio}`;
    let query = connection.query(sql,(err,result) => {
        if(err) throw err;
        res.render('edit', {
            title: 'Editando Cadastro de Relógios',
            dadosrelogios: result[0]
        });
    });
});

app.get('/delete/:id_relogio',(req,res) => {
    const id_relogio = req.params.id_relogio;
    let sql = `DELETE FROM dadosrelogios where id_relogio = ${id_relogio}`;
    let query = connection.query(sql,(err,result) => {
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/add',(req, res) => {
    res.render('add', {
        title : 'Cadastros de Relógios'
    });
});

app.post('/save',(req,res) => {
    let data = {marca: req.body.marca, modelo: req.body.modelo, calibre: req.body.calibre, movimento: req.body.movimento, caixa: req.body.caixa, cor_caixa: req.body.cor_caixa, pulseira: req.body.pulseira, cor_pulseira: req.body.cor_pulseira};
    let sql = "insert into dadosrelogios set ?";
    let query = connection.query(sql, data, (err, results) => {
        if(err) throw err
        res.redirect('/');
    });
});

app.post('/update',(req,res) => {
    const id_relogio = req.body.id_relogio;
    let sql = "update dadosrelogios set marca = '" + req.body.marca + "', modelo = '" + req.body.modelo + "', calibre = '" + req.body.calibre + "', movimento = '" + req.body.movimento + "', caixa = '" + req.body.caixa + "', cor_caixa = '" + req.body.cor_caixa + "', pulseira = '" + req.body.pulseira + "', cor_pulseira = '" + req.body.cor_pulseira + "' where id_relogio = " + id_relogio ;
    let query = connection.query(sql, (err, results) => {
        if(err) throw err
        res.redirect('/');
    });
});

