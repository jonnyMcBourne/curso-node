const {  Router } = require('express');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields');
const {deleteCategory,getcategories, postcategories, updateCategories,getCategoryById} = require('../controllers/categories.controller');
const { validateJWT } = require('../middlewares');

const router = Router();

router.get('/',[
    validateJWT,
    validateFields
],getcategories);

router.get('/:id',[
    validateJWT,
],getCategoryById);

router.post('/',[
    validateJWT,
    check('name','category name is mandatory').not().isEmpty(),
    validateFields
],postcategories);

router.put('/:id',[
    validateJWT,
    check('id',"It's not a valid Mongo Id").isMongoId(),
    validateFields
],updateCategories);

router.delete('/:id',[
    validateJWT,
    check('id',"It's not a valid Mongo Id").isMongoId(),
    validateFields,
],deleteCategory);





module.exports = router;