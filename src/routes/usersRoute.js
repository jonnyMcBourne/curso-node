const  { check } = require('express-validator');
const {  Router } = require('express');
const { 
    getUsers,
    postUsers, 
    putUsers, 
    patchUser, 
    deleteUsers,
} = require('../controllers/users.controller');
const { validateFields } = require('../middlewares/validateFields');
const { isValidRole, existEmail } = require('../helpers/db-validators');

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
router.put(   '/', putUsers );
router.patch( '/', patchUser );
router.delete('/:id',deleteUsers);

module.exports = router;