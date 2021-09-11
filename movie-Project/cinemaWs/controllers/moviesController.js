const express = require('express');
const router = express.Router();
const moviesDAL = require('../DAL/moviesDAL');
// routing
router.route('/').get(async (req, resp) => {
    let data = await moviesDAL.getAllMovies();
    return resp.json(data)
})
router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await moviesDAL.getMovieById(id);
    return resp.json(data);
})
router.route('/').post(async (req, resp) => {
    let newMovie = req.body;
    let data = await moviesDAL.addMovie(newMovie);
    return resp.json(data);
})
router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let updatedMovie = req.body;
    let data = await moviesDAL.updateMovie(id, updatedMovie);
    return resp.json(data);
})
router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let data = await moviesDAL.deleteMovie(id);
    return resp.json(data);
})
module.exports = router;