const {request,response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const GenerateJWT = require('../helpers/generate-jwt');

const login = async ( req= request, res= response ) => {
    const {email,password} = req.body
    const user = await User.findOne({email});
    if(!user){
        return res.json({msg:'email / passsword are not correct'}).status(400)
    }
    if(!user.activeStatus){
        return res.json({msg:'email / passsword are not correct'}).status(400)
    }
    const validPassword = bcrypt.compareSync(password,user.password);

    if(!validPassword){
        return res.json({msg:'email / passsword are not correct'}).status(400)
    }
    try {
        const token = await GenerateJWT(user.id);
        res.json({user:user.name,token});
    } catch (error) {
        console.log('ERROR',error);   
    }

}

module.exports={login}