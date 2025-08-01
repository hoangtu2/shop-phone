const express = require('express');
const {registerController, loginController, getAllUser,  createUser, updateUser ,deleteUser} = require('../controllers/userController')
const router = express.Router();
    router.post('/register', registerController)
    router.post('/login', loginController)
    router.get('/', getAllUser)
    router.post('/',  createUser )
    router.put('/:id', updateUser)
    router.delete('/:id', deleteUser)
module.exports = router;
