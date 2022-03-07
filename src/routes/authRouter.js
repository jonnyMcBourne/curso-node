const {  Router } = require('express');
const { check } = require('express-validator')
const { existEmail } = require('../helpers/db-validators')
const { login } = require('../controllers/login.controller');
const { validateFields } = require('../middlewares/validateFields');
const router = Router();

router.post('/',[
    check('email','email or password are not in our database').not().custom(existEmail),
    check('password','email and password are mandatory').notEmpty(),
    validateFields
],login);

module.exports = router;