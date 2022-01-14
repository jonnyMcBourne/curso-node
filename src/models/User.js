const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required:[true,'name is mandatory'],
    },
    email:{
        type: String,
        required:[true,'email is mandatory'],
        unique:true
    },
    password:{
        type: String,
        required:[true,'password is mandatory'],
        unique:true
    },
    img:{
        type: String,
    },
    role:{
        type:String,
        required:[true,'role is mandatory'],
    },
    activeStatus:{
        type: Boolean,
        default:true,
    },
    google:{
        type:Boolean,
        default:false,
    }
})
UserSchema.methods.toJSON = function(){
    const { __v, password,...user }= this.toObject();
    return user;
}
module.exports = model('User',UserSchema);