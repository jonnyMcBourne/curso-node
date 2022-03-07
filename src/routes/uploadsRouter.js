const {  Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFile  } = require('../middlewares');
const {uploadImage,updateImage} = require('../controllers/uploads.controller')
const {validCollections} = require('../helpers')
const router = Router();

router.get('/',(req ,res)=>{
    res.json({ok:'hola mundo'})
})

router.post('/',[    
    validateFile,
    validateFields,
],uploadImage);

router.put('/:collection/:id',[
    check('id','id must be a mongo Id').isMongoId(),
    check('collection').custom(c => validCollections(c,['users','products'])),
    validateFile,
    validateFields,
],updateImage);

router.delete('/',()=>{

});
module.exports = router;