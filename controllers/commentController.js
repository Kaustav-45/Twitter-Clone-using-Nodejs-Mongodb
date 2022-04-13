const Comment=require('../models/comment')
const Tweet= require('../models/posts')

module.exports.create= async function(req,res){
    try{
        
    const tweet= await Tweet.findById(req.body.tweet)
       const comment = await   Comment.create({
              content:req.body.content,
              tweet:req.body.tweet,
              user:req.user._id
          })
              tweet.comments.push(comment)
              tweet.save()
              res.redirect('/')
        
      }
    catch(err){
        console.error(err)
        res.redirect('back')
    }

    
}

module.exports.destroy= async function(req,res){
    try{
        const comment = await Comment.findById(req.params.id)
        if(comment.user==req.user.id ){
            let tweetid= comment.tweet
            comment.remove()
            Tweet.findById(tweetid,{$pull:{comments:req.params.id}},function(err,tweet){

                return res.redirect('back')
            })
        }
        
        else{ return res.redirect('/')}
    }
    catch(err){
        console.err(err)
        return res.redirect('back')
    }
    
}