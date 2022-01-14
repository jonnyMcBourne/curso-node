const { check } = require('express-validator');
const Role = require('../models/Role');
const User = require('../models/User');

const isValidRole = async( role = "")=>{
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`The ${role} does not exist in the databse`);
    }
}
const existEmail = async(email='')=>{
    const existingEmail = User.find({email});
    if(existEmail){
        throw new Error(`The ${email} already exists in our databse`)
    }   
}
module.exports = { isValidRole,existEmail }