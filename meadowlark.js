const express = require('express');
require('dotenv').config();
const fortune = require('./library/fortune.js');
const app = express();

// set up the handlebars and views engine.
const handlebars = require("express3-handlebars").create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT);
app.use(express.static('./public'));




app.get('/', (req, res) => {
    // res.status(200);
    // res.type("text/plain");
    // res.send("Welcome To Meadowlark Travel");
    res.render('home');
});

// app.get("/about*", (req,res) => { // http://localhost:2000/about?foo=bar,%20/about/?foo=bar this also work for about
//     res.status(200);    
//     res.type('text/plain');
//     res.send('About Meadowlark Travel');
// })
// // it will not be executed because wildcard character handles it.
// app.get("/about/contact", (req,res) => { // http://localhost:2000/about?foo=bar,%20/about/?foo=bar this also work for about
//     res.status(200);    
//     res.type('text/plain');
//     res.send('About Meadowlark Travel and its contact.');
// })
app.get('/about', (req, res) => {
    
    res.render('about' , { fortune : fortune.getFortune() });
})

// custom 404 page
app.use((err, req, res, next) => {
    res.status(404);
    res.render('404');
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});





app.listen(app.get('port'), (req, res) => {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})


