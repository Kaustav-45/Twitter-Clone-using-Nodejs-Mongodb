const express= require('express')
const passport=require('passport')
const router = express.Router()
const commentcontroller = require('../controllers/commentController')
router.post('/create',passport.checkAuthentictaion,commentcontroller.create)
router.get('/destroy/:id',passport.checkAuthentictaion,commentcontroller.destroy)
module.exports = router