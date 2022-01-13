const {response,request} = require("express");
const { validationResult } = require('express-validator')
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
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
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

    const existEmail = await User.findOne({email});

    console.log('existe!!!!!',existEmail);
    if(existEmail){
        return res.json({errors:'this email is already on our database'}).status(400);
    }
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password,salt);
    user.save()
      .then((resp) => {
        console.log('user created succesfullt: {email:',resp.email);
        res.status(201).json({
          ok: "OK-POST",
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