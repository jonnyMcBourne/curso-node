const  { check, param } = require('express-validator');
const {  Router } = require('express');

const {createProduct,getProducts, getProductbyId} = require('../controllers/product.controller');
const {validateFields,validateJWT} = require('../middlewares');
const {isValidCategory, isValidProduct}= require('../helpers/db-validators')
const router = Router();

router.post('/',[
    validateJWT,
    check('name','name is mandatory field').not().isEmpty(),
    check('category','is not a valid id for the category').isMongoId(),
    check('category').custom(isValidCategory),
    validateFields,
],createProduct);

router.get('/',[
    validateJWT,
],getProducts);

router.get('/:id',[
    param('id','is not a valid id').isMongoId(),
    check('product').custom(isValidProduct),
    validateFields
],getProductbyId);

router.put('/:id',(req,res)=>{
    res.json({msg:'POST-OK'});        
});

router.delete('/',(req,res)=>{
    res.json({msg:'POST-OK'});
});
    


        

module.exports = router;