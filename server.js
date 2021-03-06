"use strict";
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
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

//app.use('/', (req, res, next) => {
//  res.render('maintenance.hbs');
//next();
//});

//app.get('/maintenance', (req, res) => {
//  res.send('Maintenance');
//});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        PageTitle: 'About_us!',
        currentyear: new Date().getFullYear()
    });
});

app.get('/projects', (req, res) => {

    res.render('projects.hbs', {

        PageTitle: "Projects"
    });

});

app.listen(port, () => {
    console.log(`Port is ${port}`);
});