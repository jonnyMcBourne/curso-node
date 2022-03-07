const {response,request} = require('express');
const Product = require('../models/Product');
const {pagination} = require('../helpers/queries-helpers');
const validation = require('express-validator');
const { json } = require('express/lib/response');

const getProducts =async(req= request, res= response)=>{
    const {page=1,limit = 10} = req.query;
    const {setLimit,skipTo} = pagination(limit,page)
    try {
        const products = await Product.find({activeStatus:true})
        .populate('user','name')
        .populate('category','name')
        .limit(setLimit)
        .skip(skipTo);

        res.json({products}).status(201);
    } catch (error) {
        res.json({error}).status(401);
    }
}

const getProductbyId = async (req= request, res= response)=>{
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if(!product){
            return res.json({ms:'There is not a product with this Id',id});
        }
        res.json({product}).status(200);
    } catch (error) {
        res.json(error);
    }
}

const createProduct=async(req= request, res= response)=>{
    const {name,category,qty,price} = req.body;
    const existProduct = await Product.findOne({name});
    if(existProduct){
        return res.json({msg:'This Product alredy exists'}).status(401);
    }
    try {
        const user = req.user._id;
        const product = new Product({name, user,category,qty,price,});
        await product.save();
        res.json({product}).status(201);
    } catch (error) {
        res.json(error).status(401);
    }
}

module.exports ={ createProduct, getProducts, getProductbyId};