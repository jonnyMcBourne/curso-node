const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name:{
        type: String,
        require:[true,'Role is required']
    },
    qty:{
        type: Number,
        default:0,
    },
    activeStatus:{
        type:Boolean,
        default:true,
        require:[true,'active status is requiered']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        require:true
    },
    price:{
        type: Number,
        default:0 
    },
    created:{ 
        type: Date, 
        default:(new Date().getTime())
    },
    lastModified:{
        type: Date, 
        default:(new Date().getTime())
    },
    img:{
        type:String
    }
})

module.exports = model('Product',ProductSchema);