const express = require('express')
const router = express.Router()
const passport= require('passport')
const userController = require('../controllers/userController')

router.get('/profile/:id',passport.checkAuthentictaion,userController.profile)
router.post('/update/:id',userController.update)
router.get('/sign_in',userController.sign_in)
router.get('/sign_up',userController.sign_up)
router.post('/create',passport.checkAuthentictaion, userController.create)
router.post('/create_session',passport.authenticate('local',{
    
    failureRedirect:'/sign_in'
}), userController.create_session)
router.get('/sign_out',userController.destroySession)
module.exports= router