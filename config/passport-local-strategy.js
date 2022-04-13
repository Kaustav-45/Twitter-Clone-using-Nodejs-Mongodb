const passport = require('passport')
const LocalStartegy = require('passport-local').Strategy

const User = require('../models/users')

passport.use(new LocalStartegy({
    usernameField:'email'
},
    function (email,password,done) {

        User.findOne({email: email},function(err,user){
            if(err){
                console.log('Invalid user')
                 return done(err)
            }
           if (!user || user.password != password){
                   console.log('Incorrect password')
                   return done(null,false)
            }
             return done(null,user)
           
              
        })
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        if(err){
            console.log('Error in finding user')
            return done(err) 
        }
      done(null, user)
    })
  })
  passport.checkAuthentictaion = function(req,res,next){
      if(req.isAuthenticated()){
          return next()
      }
      return res.redirect('/users/sign_in')
  }
  passport.setAuthenticated=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user= req.user
    }
    next()
}

module.exports= passport