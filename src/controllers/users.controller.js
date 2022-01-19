const {response,request} = require("express");
const bcrypt = require('bcryptjs');
const req = require("express/lib/request");
const User = require('../models/User');
const {pagination,isValidNumber} = require('../helpers/queries-helpers');

const getUsers= async (req= request,res= response)=>{
    const {page=1,limit = 10} = req.query;
    console.log('page',page,'limit',limit)
    const {setLimit,skipTo} = pagination(limit,page)
    console.log('setLimit',setLimit,'skiptTo',skipTo);
    try {
        const [total,userst] = await Promise.all([
            User.countDocuments({activeStatus:true}),
            User.find({activeStatus:true})
                .limit(isValidNumber(setLimit))
                .skip(skipTo)
         ])
        res.json({
            total,
            userst
        }).status(200);
    } catch (error) {
        res.json({error})
    }
}

const postUsers= async( req = request, res= response)=>{
    const { name, email, password, img, role, activeStatus, google } = req.body;
    const user = new User({
      name,
      email,
      password,
      img,
      role,
      activeStatus,
      google,
    });
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password,salt);
    user.save()
      .then((user) => {
        console.log('user created succesfullt: {email:',user.email);
        res.status(201).json({
          user
        });
      })
      .catch((error) => {
        console.log("ERROR",error);
        res.json({
            error:error
        })
      });
}


const putUsers= async (req = request,res= response)=>{
    const {id} = req.params;
    const { _id, google, password, email,  ...rest } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id,rest);
        const userUpdated = await User.findById(id);
        res.json({
            userUpdated
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteUsers = async (req = request ,res= response)=>{
    const { id }=req.params;
    try {
        const user = await User.findByIdAndUpdate(id,{activeStatus:false})
        res.json({
            user,
            msg:'user deleted successfully'
        }).status(204)
    } catch (error) {
        console.log(error)
    }
    
}


const patchUser=(req,res= response)=>{
    res.json({
        ok:'PATCH'
    });
}

module.exports = { 
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    patchUser
};