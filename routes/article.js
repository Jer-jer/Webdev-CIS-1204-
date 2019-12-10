const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
// const upload = multer({
//     destination: 'uploads/',
//     filename: function(req , file, cb){
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     destination: 'articles/uploads',
//     filename: function(req , file, cb){
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
const Article = require('../models/article')

// Set Image Storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'articles/uploads')
    },
    filename: function(req, file, cb){
        // const now = new Date().toISOString()
        // const date = now.replace(/:/g, '-')
        // cb(null, date + path.extname(file.originalname))
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
    // destination: 'articles/uploads/',
    // filename: function(req , file, cb){
    //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    // }
})

// Init Upload
const upload = multer({
    storage: storage
})


//All Articles (displays all the articles)
router.get('/', (req, res) => {
    try{
        // res.render('articles/index') [goes to the index.ejs of articles]
        res.send('Article Created and saved in Database')
    }catch(err){
        res.json({ message: err })
    }
})


//New Articles (for displaying the form)
router.get('/newarticle', (req, res) => {
    res.render('articles/newarticle', { article: new Article() })
})

//Create Article
router.post('/', upload.single('articleImage'), async (req, res, next) => {
    console.log(req.file)
    const article = new Article({
        title: req.body.title,
        body: req.body.body,
    })
    // You can use this command
    // article.save((err, newArticle) => {
    //     if(err){
    //         res.render('articles/newarticle', {
    //             article: article,
    //             errorMessage: 'Error creating Article'
    //         })
    //     } else{
    //         // res.redirect(`articles/${newArticle.id}`)
    //         res.redirect(`articles`)
    //     }
    // })

    // Or this one, either way works, what's the difference? I have no idea
    try{
        const savedArticle = await article.save() 
        res.json(savedArticle) // [Used to view the created data]
        // res.redirect(`articles`)
    }catch(err){
        res.json({ message: err })
    }
})
/*router.post('/', (req, res) => {
    const article = new Article({
        name: req.body.name
    })
    article.save((err, newArticle) => {
        if(err)
        {
            res.render('articles/newarticle', {
                article: article
                errorMessage: 'Error creating Article'
            })
        } else
        {
            // res.redirect(`articles/${newArticle.id}`)
            res.redirect(`articles`)
        }
    })
})*/

//Get Specific Article
router.get('/:articleId', async (req, res) => {
    try{
        const article = await Article.findById(req.params.articleId)
        res.send(article)
    }catch(err){
        res.json({ message: err })
    }
})

//Delete Article
router.delete('/:articleId', async (req, res) => {
    try{
        const removeArticle = await Article.remove({ _id: req.params.articleId})
        res.json(removeArticle)
    }catch(err){
        res.json({ message: err})
    }
})

//Update Article
router.patch('/:articleId', async (req, res) => {
    try{
        const updateArticle = await Article.updateOne(
            { _id: req.params.articleId }, 
            { $set: {
                title: req.body.title, 
                body: req.body.body
            }
        })
        res.json(updateArticle)
    }catch(err){
        res.json({ message: err})
    }
})
module.exports = router