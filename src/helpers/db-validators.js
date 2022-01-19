const { check } = require('express-validator');
const Role = require('../models/Role');
const User = require('../models/User');

const isValidRole = async( role = "")=>{
    if(!role){  
        throw new Error(`There is not role sent`);
    }
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`The ${role} does not exist in the databse`);
    }
}
const existEmail = async(email='')=>{
    const existsEmail = await User.findOne({email});
    console.log('email',existsEmail)
    if(existsEmail){
        throw new Error(`The ${email} already exists in our databse`)
    }   
}

const existUserById = async( id )=>{
    const existsUser = await User.findById(id)
    if(!existsUser){
        throw new Error(`The user with id { ${id} } does not exists in our databse`);
    }   
}

module.exports = { isValidRole,existEmail, existUserById }