const express = require('express')
const router = express.Router()
const User = require('../models/user')

//All Users Route
router.get('/', (req, res) => {
    res.render('users/index')
})

//New Users Route
router.get('/new', (req, res) => {
    res.render('users/new', { user: new User() })
})

//Create Users Route
router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name
    })
    user.save((err, newUser) => {
        if(err) {
            res.render('users/new', {
                user: user,
                errorMessage: 'Error creating User'
            })
        }else {
            //res.redirect('users/${newUser.id}')
            res.redirect('users')
        }
    })
    res.send(req.body.name)
})


module.exports = router