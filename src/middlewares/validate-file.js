const {request,response}= require('express');

const validateFile=(req = request, res = response,next)=>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
         res.status(400).json({msg:'file was not uploaded'});
    }
    next();
}
module.exports={validateFile}