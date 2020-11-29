const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');

// Retrieve all user
router.get('/', userController.findAll);

// Create a new user
router.post('/create_user', userController.create);

// Retrieve a single user with id
router.get('/find_user:id', userController.findById);

// Update a user with id
router.put('/update_user:id', userController.update);

// Delete a user with id
router.delete('/delete_user:id', userController.delete);




module.exports = router