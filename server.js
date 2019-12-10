if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const mongodb = require('mongodb')

const indexRouter = require('./routes/index')
const articleRouter =  require('./routes/article')
const homeRouter = require('./routes/home')
const galleryRouter = require('./routes/gallery')
const aboutusRouter = require('./routes/aboutus')
const contactusRouter = require('./routes/contactus')
const aboutMembersRouter = require('./routes/aboutmem')

app.set('view engine', 'ejs')
app.set('views', __dirname +'/views')
app.set('layout', 'layouts/layout')
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.static(__dirname +'/public'))
app.use(express.static('articles/uploads'))
app.use(express.static(__dirname + 'articles/uploads'))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true}))
app.use(express.static(path.join(__dirname, '..', 'articles/uploads')))

// mongodb config
// const MongoClient = mongodb.MongoClient
// const url = 'mongodb://localhost:27017'
// MongoClient.connect(url, {
//     useUnifiedTopology: true, useNewUrlParser: true
// }), (err, client) => {
//     if(err) return console.log(err);

//     db = client.db(`Images`)
//     app.listen(3000, ()=> {
//         console.log("Mongodb server at port 3000")
//     })
// }

//Connect to mongoDB
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
app.use('/articles', articleRouter)
app.use('/layouts/home.ejs', homeRouter)
app.use('/layouts/gallery.ejs', galleryRouter)
app.use('/layouts/aboutus.ejs', aboutusRouter)
app.use('/layouts/contactus.ejs', contactusRouter)
app.use('/layouts/aboutmem.ejs', aboutMembersRouter)

app.listen(process.env.PORT || 3000)