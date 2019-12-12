const express = require('express')
const router = express.Router()
const dataBase = require('../models/article')

// Display all events in the Gallery
router.get('/', (req, res) => {
    dataBase.find({}, (error, articles) => {
        if(error){
            console.log('Error in retrieving in the database')
            console.log(error)
        }else{
            res.render('gallery/index', {
                articleList: articles
            })
        }
    })
})

// From clicking an event in the Gallery
router.get('/articlegallery/:id', (req, res) => {
    const id = req.params.id

    dataBase.findById(id, (error, foundArticle) => {
        if(error){
            console.log("Coudn't find game with the id")
        }else{
            res.render('gallery/articlegallery', {
                article: foundArticle,
            })
        }
    })
})
module.exports = router