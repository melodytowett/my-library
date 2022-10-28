const http = require('http');
const express = require('express');
const { render } = require('ejs');
const Book = require('./models/books.model');
const app = express();
const sequelize= require("sequelize");
const { title } = require('process');
const morgan = require('morgan');

//const Book = new book();
const Sequelize = new sequelize(
    'library',
    'root',
    'meloA@3903.',
    {
        host:'localhost',
        dialect:'mysql'
    }
);
Sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});
//register ejs view engine
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.listen(3000);


app.get('/',(req,res)=>{
    res.redirect('/books');
})
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/books',(req,res)=>{
    Book.findAll()
    .then((result)=>{
        res.render('index',{books:result})
    })
    .catch((err)=>{
        console.log(err);
    })
});
app.post('/books',(req,res)=>{
    const book = new Book(req.body);
    book.save()
    .then((result)=>{
        res.redirect('/books');
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.get('/add',(req,res)=>{
    res.render('add')
})
app.use((req,res)=>{
    res.status(404).render('404');
})
