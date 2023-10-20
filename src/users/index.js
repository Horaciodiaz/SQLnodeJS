const express = require('express');

const { UserController } = require('./controller')


const router = express.Router();

module.exports.UserAPI = (app) => {
    router
        .get('/', UserController.getUsers)
        .get('/:id', UserController.getUser)
        .post('/',UserController.createUser)
        .put('/:id',UserController.updateUser)
        .delete('/:id',UserController.deleteUser)
    
    app.use('/api/users', router);
}