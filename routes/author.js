const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All Authors Route
router.get('/', async (req,res,next)=>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{ authors: authors,
                                     searchOptions: req.query })
    } catch {
        res.redirect('/');
    }
    res.render('authors/index');
});

// New Author Route
router.get('/new',(req,res,next)=>{
    res.render('authors/new', {author: new Author()});
});

// Post route to create 
router.post('/', async (req,res,next)=>{
    // Create a new author 
    const author = new Author({
        name: req.body.name
    });
    // Save the new author that was created
    try {
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res .redirect(`authors`)
    } catch {
        res.render('authors/new',{
            author:author,
            errorMessage: 'Error creating author!'
        })
    }
    //author.save()
    //    .then(function(newAuthor){
    //        //res.redirect(`authors/${newAuthor.id}`);
    //        res.redirect(`authors`);
    //    })
    //    .catch(function(err){
    //        res.render('authors/new',{
    //           author:author,
    //            errorMessage: 'Error creating author!'
    //        })
    //    })
});

module.exports = router;