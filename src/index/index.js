const express = require('express');
const httpError = require('http-errors');
const { Response } = require('../common/response');

module.exports.IndexAPI = (app) => {
    const router = express.Router();
    
    router.get('/', (request, response) => {
        const menu = {
            users: `localhost:3000/api/users`,
        }
        Response.success(response, 200, "SQL API", menu);
    })

    app.use('/',router);
}

module.exports.NotFoundAPI = (app) => {
    const router = express.Router();

    router.all("*", (request, response) => {
        Response.error(response, new httpError.NotFound());
    })
    app.use('/',router);
}