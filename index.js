const express= require('express')
const session = require('express-session')
const cors= require('cors')
const passport= require('passport')
//const mongoStore= require('connect-mongo')
const sassmiddleware = require('node-sass-middleware')
const passportlocal = require('./config/passport-local-strategy')
const app = express()
const userROUTER = require('./router/index')
const flash = require('connect-flash')
const connect = require('./config/database')
const {setFlash}=require('./config/middleware')

const multer = require('multer')
const upload= multer({ dest: 'upload/' })
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.use(session({
    name:'Twitter',

    secret:'kaustav',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:6000000
    }/*,
    store : new mongoStore({
        mongoUrl: 'mongodb://localhost/twitterclone_db',
        autoRemove:'disable'
        
    },function(err){
        if(err)
            console.error(err)

        
    })*/
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticated)
app.use(flash())
app.use(setFlash)
app.use('/',userROUTER)
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log('uploaded')
    res.redirect('/')
})
app.listen(3000,async ()=>{
    await connect()
    console.log('server started')
    

})