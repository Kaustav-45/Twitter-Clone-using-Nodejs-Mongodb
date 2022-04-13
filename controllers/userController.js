const User = require('../models/users')
module.exports.profile= function(req,res){
     User.findById(req.params.id,function(err,user){
         if(!user){
             return res.redirect('/')
         }

         return res.render('users/user_profile',{title:'User',profile_user:user})
     })
   
}
module.exports.sign_in= function(req,res){
    if(req.isAuthenticated()){
       
        return res.redirect('/users/profile')
    }
    
    return res.render('users/user_sign_in',{title : 'Twitter sign in'})
}
module.exports.sign_up= function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('users/user_sign_up',{title : 'Twitter sign out'})
}
module.exports.create= function(req,res){
    if(!req.body.email || !req.body.password ) {
        res.redirect('back')
    }

    User.findOne({email: req.body.email},(err,user)=>{
        if(err){
            console.error(e)
             return 
       }
       if(!user){
            User.create(req.body,(err,user)=>{
              if(err){
                   console.error(e)
                    return 
              }
           return   res.redirect('/users/sign_in') 
            })
       }
       else{
      return   res.redirect('/users/sign_in') 
       }
    })
}
module.exports.create_session= function(req,res){
    
    req.flash('success','Signed in successfully')
     return res.redirect('/')
}
module.exports.destroySession= function(req,res){
    req.logout()
    req.flash('info','Signed out successfully')
    return res.redirect('/')
}
 module.exports.update = function(req,res){
     if(req.user.id == req.params.id){
         User.findByIdAndUpdate(req.user.id,req.body,function(err,user){
             if(err){
                 console.log('Error Updating user')
                 return res.redirect('/')
             }
             return res.redirect('back')
         })
     }
     else{
         return res.status(401).isAuthenticated('Unauthorised')
     }
 }