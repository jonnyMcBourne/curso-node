const {response,request} = require("express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUsers=(req= request,res= response)=>{
    const query = req.query;
    if(!query){
        res.json({
            ok:'GET',
        });
    }else{
        res.json({
            ok:'GET-PARAMS',
        });
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


const putUsers=(req,res= response)=>{
    res.json({ok:'PUT'});
}

const deleteUsers =(req = request ,res= response)=>{
    const { id }=req.params;
    res.json({
        ok:'DELETE',
        id:id
    });
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