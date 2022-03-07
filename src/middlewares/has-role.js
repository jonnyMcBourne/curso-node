const { request, response } =require('express');
const hasRole = (...roles) => {
    return (req=request,res = response,next) => {
        const userRoles = req.user.role;
        if(!userRoles){
            return res.json({msg:'user Invalid-no user'})
        }
        if(!roles.includes(userRoles)){
            return res.json({msg:'User doesnt have permissions'})
        }
        next();
    }
}
module.exports = {hasRole}