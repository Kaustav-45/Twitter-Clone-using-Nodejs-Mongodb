const Tweet = require('../models/posts')
const User= require('../models/users')
module.exports.root= async function(req,res){
     try{

     
     const tweets = await Tweet.find({})
     .populate('user')
     .populate({
          path:'comments',
          populate :{
               path:'user'
          }
     }).sort({'createdAt':-1}).exec()
     
          let fetchedweets = tweets
          const users = await User.find()
     

     return res.render('home',{title:'Twitter',tweets:fetchedweets,users:users})
}
catch(err){
     console.error(err)
     return 
}

}