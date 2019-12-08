if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const homeRouter = require('./routes/home')
const galleryRouter = require('./routes/gallery')
const aboutusRouter = require('./routes/aboutus')
const contactusRouter = require('./routes/contactus')
const aboutMembersRouter = require('./routes/aboutmem')

app.set('view engine', 'ejs')
app.set('views', __dirname +'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.static(__dirname +'/public'))
app.use(express.static('stylesheets'))
app.use(express.static(__dirname +'/stylesheets'))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Successfully Connected to Mongoose Server'))

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/layouts/home.ejs', homeRouter)
app.use('/layouts/gallery.ejs', galleryRouter)
app.use('/layouts/aboutus.ejs', aboutusRouter)
app.use('/layouts/contactus.ejs', contactusRouter)
app.use('/layouts/aboutmem.ejs', aboutMembersRouter)

app.listen(process.env.PORT || 3000)