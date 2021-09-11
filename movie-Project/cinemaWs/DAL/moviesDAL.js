const axios = require('axios')
// functions
const getAllMovies = async () => {
    let resp = await axios.get('http://localhost:8000/movies')
    let movies = resp.data
    return movies
}
const getMovieById = async (id) => {
    let resp = await axios.get(`http://localhost:8000/movies/${id}`)
    let movie = resp.data
    return movie
}
const addMovie = async (newMovie) => {
    let resp = await axios.post('http://localhost:8000/movies', newMovie)
    let movie = resp.data
    return movie
}
const updateMovie = async (id, updatedMovie) => {
    let resp = await axios.put(`http://localhost:8000/movies/${id}`, updatedMovie)
    let movie = resp.data
    return movie
}
const deleteMovie = async (id) => {
    let resp = await axios.delete(`http://localhost:8000/movies/${id}`)
    let movie = resp.data
    return movie
}
module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie }