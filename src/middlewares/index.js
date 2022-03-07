const hasRole = require('../middlewares/has-role');
const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validateFields');
const validateUploads = require('../middlewares/validate-file');
module.exports={...hasRole,...validateJWT,...validateFields,...validateUploads};