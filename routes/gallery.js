const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('layouts/gallery')
})
module.exports = router