const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name:{ 
        type: String, 
        require:[true,'name is required']
    },
    activeState:{
        type:Boolean,
        default:true,
        require:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true 
    },
    created:{ 
        type: Date, 
        default:(new Date().getTime())
    },
    lastModified:{
        type: Date, 
        default:(new Date().getTime())
    }
})

module.exports = model('Category',CategorySchema);