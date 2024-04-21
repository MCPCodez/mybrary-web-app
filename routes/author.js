const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All Authors Route
router.get('/',(req,res,next)=>{
    res.render('authors/index');
});

// New Author Route
router.get('/new',(req,res,next)=>{
    res.render('authors/new', {author: new Author()});
});

// Post route to create 
router.post('/',(req,res,next)=>{
    // Create a new author 
    const author = new Author({
        name: req.body.name
    });
    // Save the new author that was created
    author.save()
        .then(function(newAuthor){
            //res.redirect(`authors/${newAuthor.id}`);
            res.redirect(`authors`);
        })
        .catch(function(err){
            res.render('authors/new',{
                author:author,
                errorMessage: 'Error creating author!'
            })
        })
});

module.exports = router;