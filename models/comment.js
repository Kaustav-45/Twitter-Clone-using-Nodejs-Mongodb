const mongoose = require('mongoose')
 const commentSchema = new mongoose.Schema({
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

     }, tweet : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tweet',
        required :  true

    }
 },{timestamps:true})

 module.exports=mongoose.model('Comment',commentSchema)