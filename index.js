const express = require('express');
const cors = require('cors')

const { Config } = require('./src/config/index.js')
const { UserAPI } = require('./src/users/index')
const { IndexAPI, NotFoundAPI } = require('./src/index/index')
 
const app = express();

app.use(cors({ origin: 'http://localhost:4200' }))

app.use(express.json());

IndexAPI(app);
UserAPI(app);

NotFoundAPI(app);

app.listen(Config.port, () => {
    console.log(`Server running at http://localhost:${Config.port}`)
})