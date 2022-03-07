const {request , response} = require('express');
const Category = require('../models/Category');
const  {pagination} = require('../helpers/queries-helpers');




const getcategories = async(req = request, res = response)=>{
    const {setLimit,skipTo} = pagination();
    try {
        const categories = await Category.find({activeState:true})
        .populate('user','name')
        .limit(setLimit)
        .skip(skipTo);

        res.json({categories});

    } catch (error) {
        res.json({msg:error}).status(500);
    }
};

const getCategoryById=async(req = request, res = response)=>{
    const {id} = req.params;
    try {
        const category = await Category.findById(id).populate('user','name')
        if(!category){
            res.json({msg:'There is not a category with this id',id});
        }
        res.json(category);
    } catch (error) {
        res.json(error);
    }
}

const updateCategories= async(req = request, res = response)=>{
    const {id} = req.params;
    const newName = req.body.name?.toUpperCase();
    const category = await Category.findById(id);
    if(!category){
        return res.json({msg:'There is not a Category with his id', id });
    }
    const newCategory = { name:newName ,lastModified: new Date().getTime()};
    try {
    const category = await Category.findByIdAndUpdate(id,newCategory);
        res.json(category);
    } catch (error) {
        res.json(error);
    }
}


const postcategories = async (req = request, res = response)=>{
    const name = req.body.name.toUpperCase();
    const categoryFound = await Category.find({name})
    if(categoryFound){
        return res.json({msg:'this category already exist!'});
    }
    const data = { user: req.user._id, name}
    const category = new Category(data);
    try {
        await category.save();
        res.json({msg:'category saved'}).status(201);
    } catch (error) {
        
    }
}

const deleteCategory = async (req = request, res = response)=>{
    const {id} = req.params
    const category= await Category.findByIdAndUpdate(id,{activeState:false});
    if(!category){
        return res.json({msg:'This category doesnt exist'})
    }
    res.json({msg:'Category deleted successfully'}).status(204);

}

module.exports = {getcategories,postcategories,updateCategories,getCategoryById,deleteCategory}