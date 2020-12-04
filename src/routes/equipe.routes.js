const express = require('express')
const router = express.Router()
const userController = require('../controllers/equipe.controller');

// Retrieve all user
router.get('/', userController.findAll);

// Create a new user
router.post('/create_eq', userController.create);

// Retrieve a single user with id
router.get('/find_eq/:id', userController.findById);

// Update a user with id
router.put('/update_eq/:id', userController.update);

// Delete a user with id
router.delete('/delete_eq/:id', userController.delete);




module.exports = router