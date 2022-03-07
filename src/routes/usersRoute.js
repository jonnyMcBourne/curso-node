const  { check } = require('express-validator');
const {  Router } = require('express');

const { isValidRole, existEmail, existUserById } = require('../helpers/db-validators');
const {validateFields, validateJWT,hasRole }= require('../middlewares');


const { 
    getUsers,
    postUsers, 
    putUsers, 
    deleteUsers,
} = require('../controllers/users.controller');


const router = Router();

router.get('/', getUsers);
router.post(  '/',[
    check('email','not valid email').isEmail(),
    check('password','password lenght is incorrect').isLength({min:5,max:16}),
    check('name','not valid name lenght or is empty').isLength({min:2}),
    check('role',).custom( isValidRole ),
    check('email',).custom( existEmail ),
    validateFields
] ,postUsers );

router.put('/:id',[
    check('id','is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    check('role',).custom( isValidRole ),
    validateFields
],putUsers );

router.delete('/:id',[
    validateJWT,
    hasRole('ADMIN_ROLE','SALES_ROLE'),
    check('id','is not a valid id').isMongoId(), 
    check('id').custom(existUserById),
    validateFields
],deleteUsers);



module.exports = router;