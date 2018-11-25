const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs')

hbs.registerHelper('getCurrentYear', () => {

    return new Date().getFullYear();
});
hbs.registerHelper('changeFont', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var log = `${new Date().toString()} path ${req.path} method ${req.method}`;
    fs.appendFile('server.log',log+'\n', (error) => {
        if(error){
            console.log(error);
        }
        next();
    });
});
// app.use((req, res, next) => {
//     res.render('maintanence.hbs');
// });
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('home.hbs',{
        welcome : 'Hi this is Express Appliaciton'
    });
});

app.get('/about', (req, res) => {
        res.render('about.hbs',{
            pageTitle : 'About Page'
        });
});
app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});