const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const imgUpload = require('express-fileupload')
const _ = require('lodash')
const dataBase = require('../models/article')
const Article = require('../models/article')

//New Articles (for displaying the form)
router.get('/newarticle', (req, res) => {
    res.render('articles/newarticle', { article: new Article() })
})

router.get('/', (req, res) => {
    res.render('articles/index')
})

//Open Specific Article
router.get('/:id', (req, res) => {
    const id = req.params.id

    dataBase.findById(id, (error, foundArticle) => {
        if(error){
            console.log("Atay")
            console.log(error)
        }else{
            res.render('articles/index', {
                article: foundArticle
            })
        }
    })
})

// dataBase.create([
//     {
//         event: 'SAS Week 2019',
//         title: 'Week of Welcome 2019',
//         name: 'Monica Barrientos',
//         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, s ed do eiusmod tempor incididunt ut labore et dolore' +
//         'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod o' +
//         'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +

//         'Lorem ipsum dolo r sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
//         'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori s nisi ut aliquip ex ea commodo' +
//         'consequat. Duis aute irure dolor in reprehenderit in v oluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
//         'Excepteur sint occaecat c upidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         images: {
//             imgName: 'sasweek.jpg',
//             mimetype: 'image/jpg',
//             size: 123568,
//         }
//     },{
//         event: 'Week of Welcome',
//         title: 'Week of Welcome',
//         name: 'Nicole Genon',
//         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, s ed do eiusmod tempor incididunt ut labore et dolore' +
//         'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod o' +
//         'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill um dolore eu fugiat nulla pariatur.' +
//         'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
        
//         'Lorem ipsum dolo r sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
//         'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori s nisi ut aliquip ex ea commodo' +
//         'consequat. Duis aute irure dolor in reprehenderit in v oluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
//         'Excepteur sint occaecat c upidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         images: {
//             imgName: 'sampleuaa2.jpg',
//             mimetype: 'image/jpg',
//             size: 2546862,
//         }
//     },
// ])

//Create Article
router.post('/', async (req, res, next) => {
    const imgFile = req.files.articleImage

    let images = []
    _.forEach(_.keysIn(imgFile), (key) => {
        let photo = imgFile[key]

        photo.mv('uploads/' + photo.name)

        images.push({
            imgName: photo.name,
            mimetype: photo.mimetype,
            size: photo.size
        })
    })
    const article = new Article({
        event: req.body.event,
        title: req.body.title,
        name: req.body.name,
        body: req.body.body,
        images: images
    })
    try{
        const savedArticle = await article.save()
        res.redirect(`gallery/`)
    }catch(err){
        res.json({ message: 'error!' })
    }
})

//Edit Article
router.get('/edit/:id', (req, res) => {
    const id = req.params.id

    dataBase.findById(id, (error, foundArticle) => {
        if(error){
            console.log("Yawa")
            console.log(error)
        }else{
            res.render('articles/edit', {
                article: foundArticle
            })
        }
    })
})

//Update Article
router.post('/update/:id', (req, res) => {
    const id = req.params.id
    dataBase.findByIdAndUpdate(id, {
        event: req.body.event,
        title: req.body.title,
        name: req.body.name,
        body: req.body.body
    }, (err, updatedArticle) => {
        if(err){
            console.log("Couldn't update Game")
            console.log(err)
        }else{
            console.log('Article Updated' + updatedArticle)
            res.redirect(`/gallery`)
        }
    })
})

router.get('/delete/:id', (req, res) => {
    const id = req.params.id

    dataBase.findByIdAndDelete(id, (err) => {
        if(err){
            console.log("Couldn't delete Game")
            console.log(err)
        }else{
            res.redirect('/gallery')
            console.log('Article deleted' + id)
        }
    })
})
// router.get('/:id/edit', (req, res) => {
//     res.send('Edit Author', req.params.id)
// })

// router.put('/:id', (req, res) => {
//     res.send('Update Author', req.params.id)
// })

// router.delete('/:id', (req, res) => {
//     res.send('Delete Author', req.params.id)
// })


//Delete Article
router.delete('/:articleId', async (req, res) => {
    try{
        const removeArticle = await Article.remove({ _id: req.params.articleId})
        res.json(removeArticle)
    }catch(err){
        res.json({ message: err})
    }
})
module.exports = router