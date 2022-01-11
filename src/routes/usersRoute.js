const {  Router } = require('express');
const { 
    getUsers,
    postUsers, 
    putUsers, 
    patchUser, 
    deleteUsers,
} = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);
router.post(  '/', postUsers );
router.put(   '/', putUsers );
router.patch( '/', patchUser );
router.delete('/:id',deleteUsers);

module.exports = router;