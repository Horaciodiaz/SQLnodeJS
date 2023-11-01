const httpError = require('http-errors')

const { Response } = require('../common/response')
const { UserService } = require('./services')

module.exports.UserController = {

    getUsers: async (req, res) => {
        try {
            const users = await UserService.getAll();
            Response.success(res, 200, 'Lista de usuarios', users);
        } catch (error) {
            console.log(error);
            Response.error(res);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params: { tag }} = req;
            const user = await UserService.getUser(tag);
            if(user) Response.success(res, 200, `Usuario: ${user.userName}`, user);
            else Response.error(res, httpError.NotFound());
        } catch (error) {
            console.log(error)
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0)
                Response.error(res, new httpError.BadRequest());
            else{
                const newUser = await UserService.createUser(body);
                Response.success(res, 201, "Usuario agregado", newUser);
            }
        } catch (error) {
            console.log(error);
            Response.error(res);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { params: { tag }, body } = req;
            if (!body || Object.keys(body).length === 0)
                Response.error(res, new httpError.BadRequest());
            else {
                const updated = await UserService.updateUser(body, tag);
                if (updated)
                    Response.success(res, 200, "Usuario Actualizado", updated);
                else
                    Response.error(res, httpError.NotFound());
            }
        } catch (error) {
            console.log(error);
            Response.error(res);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {params: { tag }} = req;
            const deleted = await UserService.deleteUser(tag);
            if(deleted) 
                Response.success(res, 200, "Usuario Eliminado", deleted);
            else 
                Response.error(res, httpError.NotFound());
        } catch (error) {
            console.log(error);
            Response.error(res);
        }
    }
}