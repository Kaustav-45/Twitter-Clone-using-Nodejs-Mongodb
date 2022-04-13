const mongoose = require('mongoose')
 const tweetSchema = new mongoose.Schema({
     content:{
         type:String,
         required:true,
         maxlength:300,
         minlength:5
     },
     user : {
         type: mongoose.Schema.Types.ObjectId,
         ref:'User',
         required :  true

     },
     comments:[
         {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment',
            
         }
     ]
 },{timestamps:true})

 module.exports=mongoose.model('Tweet',tweetSchema)
