"use strict";
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => { /* handle error */ });
    next();
});
app.get('/', (req, res) => {

    res.send('Hello Express!');

});

app.use('/', (req, res, next) => {
    res.render('maintenance.hbs');

});

//app.get('/maintenance', (req, res) => {
//  res.send('Maintenance');
//});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        PageTitle: 'About_us!',
        currentyear: new Date().getFullYear()
    });
});


app.listen(3000);