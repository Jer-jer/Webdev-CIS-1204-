const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('layouts/sasweek')
})
module.exports = router