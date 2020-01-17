const express = require('express');
//app
const app = express();
var path = require('path');
var session = require('express-session');
//routes

const routesPages = require('./routes/allRoutes');

//body-parser module
var bodyParser = require("body-parser"); 
app.use(bodyParser.json()); 
app.use(express.urlencoded( { extended : false}));

//setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//setup session
app.use(session({
    secret: 'holaaah',
    saveUninitialized: true,
    resave: true,
    //cookie: {
    //    maxAge: 60 * 1000 * 30
    //}
    
}));


// my routes
app.use('/', routesPages);


app.use((req,res, next)=>{
    var err = new Error('This page does not exist')
    err.status = 404;
    next(err);
});


// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});



//index page //display all products when connected


//signup
  
app.post('/signup', (req,res) => { 

    if (req.body.username.length > 4 ){
        var username = req.body.username; 
        User
        var data = { 
            "username": username, 
        }
    } else {
        throw error;
    }
    res.json(data);
    res.render('signup', {title: 'signup'})
    //usernameconsole.log(req.body.data);

});

//posts list




//create a product only when a hamster are signup
app.post('/', (req, res) => {
    if(!req.body.username || req.body.article.length < 3){
        res.status(400).send('Error');
        //return;
    };

    const post = {
        id: posts.length + 1,
        username: req.body.username,
        article: req.body.article,
        like: req.body.like
    }

    console.log(req.body);
    posts.push(post);
    res.json(post);
    res.sendStatus(200);
})

//share a product with other hamsters


app.post('/', (req, res) => {
    if(!req.body.username || req.body.article.length < 3){
        res.status(400).send('Error');
        //return;
    };

    const post = {
        id: posts.length + 1,
        username: req.body.username,
        article: req.body.article,
        like: req.body.like
    }

    console.log(req.body);
    posts.push(post);
    res.json(post);
    res.sendStatus(200);
})


const port = process.env.PORT || 3000;


app.listen(port, () => console.log('Listening on port ${port}'));

module.exports = app;