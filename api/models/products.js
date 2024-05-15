const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:String,
    img:String,
    desc:String,
    price:Number,
    status:{type:String,default:'IN-STOCK'},
    qty:Number
})

module.exports=mongoose.model('product',productSchema)