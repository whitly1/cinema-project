const express = require('express');
require('./configs/mongoose');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const usersJsonController = require('./controllers/usersJsonCont');
app.use('/cinema/usersJson', usersJsonController);
const permissionsJsonController = require('./controllers/permissionsController');
app.use('/cinema/permissionsJson', permissionsJsonController);
const usersBlController = require('./controllers/usersController');
app.use('/cinema/users', usersBlController);
const membersController = require('./controllers/membersController');
app.use('/members', membersController);
const moviesController = require('./controllers/moviesController');
app.use('/movies', moviesController);
const subscriptionsController = require('./controllers/subscriptionsController');
app.use('/subscriptions', subscriptionsController);
app.listen(8001,
    console.log("start")
)