const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String,
    },
    gender:{
        type:Number,
        default:0
    },
    images:{
        type:Array,
        default:[]
    },
    sold:{
        type:Number,
        maxLength:100,
        default:0
    },
    views:{
        type:Number,
        default:0
    },
    seasons:{
        type:Number,
        default:1
    }
},{timestamps:true})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }