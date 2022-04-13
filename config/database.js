const mongoose = require('mongoose')
const connect = function(){
    console.log('mongodb connected')
    return mongoose.connect('mongodb://localhost/twitterclone_db'

    )
}


module.exports = connect

