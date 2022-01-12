const {response,request} = require("express");

const getUsers=(req= request,res= response)=>{
    const query = req.query;
    if(!query){
        res.json({
            ok:'GET',
        });
    }else{
        res.json({
            ok:'GET-PARAMS',
            query
        });
    }
}
const postUsers=( req = request, res= response)=>{
    console.log('',req.body)
    const body = req.body; 
    
    res.status(201).json({
        ok:'OK-POST',
        body:body
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