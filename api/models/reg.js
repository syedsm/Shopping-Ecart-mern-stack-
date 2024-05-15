const mongoose=require('mongoose')

const regSchema=mongoose.Schema({
    username:String,
    password:String,
    status:{type:String,default:"Active"}
})

module.exports=mongoose.model('reg',regSchema)


