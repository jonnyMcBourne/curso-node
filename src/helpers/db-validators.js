const { check } = require('express-validator');
const Role = require('../models/Role');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

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

const isValidCategory=async(id)=>{
    const categoryExist = await Category.findById(id);
    if(!categoryExist){
        throw new Error(`the Category with id:${id} does not exist in the database`);
    }
}

const isValidProduct=async(id)=>{
    const productExist = await Product.findById(id);
    if(!productExist){
        throw new Error(`the Product with id:${id} does not exist in the database`);
    }
}

module.exports = { isValidRole,existEmail, existUserById, isValidCategory, isValidProduct }