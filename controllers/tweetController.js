
const Tweet = require('../models/posts')
const Comment=require('../models/comment')
 module.exports.create = async function(req,res){
     try{
     await Tweet.create ({
         content :req.body.content,
         user : req.user._id}
     )
         
          return  res.redirect('back')
     }
         
     catch(err){
         
         console.log('Error in creating a tweet')
         return res.redirect('/')
     }
         
     
 }
 module.exports.destroy= async function(req,res){
    
    try{
    
    const tweet = await Tweet.findById(req.params.id)
         
             if(tweet.user == req.user.id){
             tweet.remove()
             Comment.deleteMany({tweet : req.params.id},  function(err){
               
                return   res.redirect('back')
               
             })
             }
             else{
             return res.redirect('back')
             }
             }
             catch(err){
                console.error(err)
                return 
            }
            
         
     
 }
 