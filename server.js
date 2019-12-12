if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const imgUpload = require('express-fileupload')
const override = require('method-override')

const dataBase = require('./models/article')
const indexRouter = require('./routes/index')
const articleRouter =  require('./routes/article')
const newArticleRouter = require('./routes/article')
const homeRouter = require('./routes/home')
const galleryRouter = require('./routes/gallery')
const aboutusRouter = require('./routes/aboutus')
const contactusRouter = require('./routes/contactus')
const aboutMembersRouter = require('./routes/aboutmem')

app.set('view engine', 'ejs')
app.set('views', __dirname +'/views')
app.set('layout', 'layouts/layout')
app.use(express.static('public'))
app.use(express.static(__dirname +'/public'))
app.use(bodyParser.json())
app.use(express.json())
app.use(expressLayouts)
app.use(override('_method'))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true}))
app.use(imgUpload())

//Connect to Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true
})

const db = mongoose.connection
db.once('open', function(){
    console.log('Successfully Connected to Mongoose')
}).on('error', function(error){
    console.log('Error! Connection Failed:', error)
})

app.use('/', indexRouter)
app.use('/articles', newArticleRouter)
app.use('/articles/:id', articleRouter)
app.use('/layouts/home.ejs', homeRouter)
app.use('/gallery', galleryRouter)
app.use('/layouts/aboutus.ejs', aboutusRouter)
app.use('/layouts/contactus.ejs', contactusRouter)
app.use('/layouts/aboutmem.ejs', aboutMembersRouter)

app.listen(process.env.PORT || 3000)