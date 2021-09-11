const express = require('express')
const app = express()
const cors = require('cors')
const membersBl = require('./BL-models/membersBl')
const membersController = require('./controllers/membersController')
const moviesBl = require('./BL-models/moviesBl')
const moviesController = require('./controllers/moviesController')
const subsController = require('./controllers/subsController')
require('./configs/dataBase')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use('/members', membersController)
app.use('/movies', moviesController)
app.use('/subscriptions', subsController)
const start = () => {
    // membersBl.saveMembers()
    // moviesBl.saveMovies()
    // in the first run lines 18-19 are normal and after the server starts,
    //we put them in comments so the data we want gets in the collections
    console.log("start")
}

app.listen(8000, () => {
    start();
})
