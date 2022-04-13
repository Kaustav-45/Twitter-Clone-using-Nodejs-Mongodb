const express= require('express')
const passport=require('passport')
const router = express.Router()
const tweetcontroller = require('../controllers/tweetController')
router.post('/create',passport.checkAuthentictaion,tweetcontroller.create)
router.get('/destroy/:id',passport.checkAuthentictaion,tweetcontroller.destroy)

module.exports = router