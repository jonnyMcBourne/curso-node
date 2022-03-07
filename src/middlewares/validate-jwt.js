const {request,response} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validateJWT= async (req = request,res = response,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.json({msg:'No Authorizathed-no-token'}).status(401);
    }
    try {
        const {uuid}= jwt.verify(token,process.env.SECRET);
        if(!uuid){
            return res.json({msg:'No Authorizathed-uuid'}).status(401);
        }
        const user = await User.findById(uuid);
        if(!user || !user.activeStatus){
            res.json({msg:'User no valid'}).status(401);
        }
        req.user = user;
    } catch (error) {
        console.log('ERROR', error);
        res.json({error:error}).status(401);
    }
    next();
}
module.exports = {validateJWT}