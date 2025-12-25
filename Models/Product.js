const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    badges:{
        discount:String,
        stock:String
    },
    image:{
        src:String,
        alt:String
    },
    price:String,
    oldPrice:String,
    title:String,
    button:String
});
module.exports=mongoose.model('Product',productSchema);