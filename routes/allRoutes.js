const express = require('express');
const User = require('../users')
const router = express.Router();
const Post = require('../posts');

//create an object from the class User, Post 
const users = new User();
const posts = new Post();

//GET INDEX PAGE
router.get('/', (req, res)=>{
    //res.render('home', {title:'Test'});

    let user = req.session.user;

    if(user){
       res.redirect('/home')
    }
    res.render('index', {title:'Welcome page'})
})

// GET HOME USER PAGE
router.get('/home', (req, res)=>{
    //res.render('home', {title:'Test'});

    let user = req.session.user;

    if(user){
        res.render('home', {opp: req.session.opp, name: user.username})
        return;
    }
    
    res.redirect('/')
})


router.post('/login', (req,res, next)=>{
    users.login(req.body.username, function(result){
        if(result){
            req.session.user = result;
            req.session.opp = 1;
            
            res.redirect('/home')
            //res.send('Welcome ' + inputUser.username)
        } else {
            res.redirect('/login')
            res.send('Username is wrong')
        }
    })
})

//register page
router.post('/register', (req, res, next)=> {

    let inputUser = {
        username: req.body.username,
    }
    //console.log(req.body.username)

    users.create(inputUser, function(lastId){
        if(lastId){

            user.find(lastId, function(result){
                req.session.user = result;
                req.session.opp = 1;
            
                res.redirect('/home')
            })//res.send('Welcome ' + inputUser.username)
        }
        console.log('Error creating a new user..');
    })
   // res.json(req.body);
});

// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});


router.get('/posts', function(req,res){
    let post = {
        title: req.body.title,
        body: req.body.body,
    }

    if(post){
        res.render('home', {bud: post.title, dy: post.body})
        return;
    }
    
    res.redirect('/')
})

//register page
router.post('/home/addpost', (req, res, next)=> {

    let inputPost = {
        title: req.body.title,
        body: req.body.body,

    }

    posts.create(inputPost, function(err,rows, fields){
        if(!err)

        rows.forEach(element => {
            if(element.constructor === Array)
            res.send('Post added: ' + element[0].postID)

            
        })
        
        res.redirect('/home')
        console.log(inputPost)
            
        

        
    })
   // res.json(req.body);
});


module.exports = router; 