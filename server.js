var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index");
})

app.post('/process', function(req, res) {
    console.log("made it to '/process")
    console.log("POST DATA", req.body);
    context = {
        name: req.body.name,
        dojo_location: req.body.dojo_location,
        favorite_language: req.body.favorite_language,
        comment: req.body.comment,
    }
    res.redirect('/result');
})
app.get('/result', function(req, res) {
    console.log("made it to '/result'")
    console.log(context);
    res.render('result', context);
})





app.listen(8000, function() {
    console.log("listening on port 8000");
});
