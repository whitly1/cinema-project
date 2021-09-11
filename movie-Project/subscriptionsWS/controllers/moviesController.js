const express = require('express');
const router = express.Router();
const moviesBl = require('../BL-models/moviesBl');

// routing
router.route('/').get(async (req, resp) => {
    try {
        let data = await moviesBl.getAllMovies();
        return resp.json(data);
    } catch (err) { console.log(err) }
});
router.route('/:id').get(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await moviesBl.getMovieById(id);
        return resp.json(data);
    } catch (err) { console.log(err) }
});
router.route('/:id').put(async (req, resp) => {
    try {
        let id = req.params.id;
        let movie = req.body;
        let data = await moviesBl.updateMovie(id, movie);
        return resp.json(data);
    } catch (err) { console.log(err) };
});
router.route('/').post(async (req, resp) => {
    try {
        let newMovie = req.body;
        let data = await moviesBl.createMovie(newMovie);
        return resp.json(data);
    } catch (err) { console.log(err) }
});
router.route('/:id').delete(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await moviesBl.deleteMovie(id);
        return resp.json(data);
    } catch (err) { console.log(err) };
});
module.exports = router;