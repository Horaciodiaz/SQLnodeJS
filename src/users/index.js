const express = require('express');

const { UserController } = require('./controller')


const router = express.Router();

module.exports.UserAPI = (app) => {
    router
        .get('/', UserController.getUsers)
        .get('/:tag', UserController.getUser)
        .post('/',UserController.createUser)
        .put('/:tag',UserController.updateUser)
        .delete('/:tag',UserController.deleteUser)
    
    app.use('/api/users', router);
}