const movies = require('../mongoose-models/moviesModel');
const moviesDAL = require('../DALs/moviesDAL');
const subsBl = require('./subsBl');

// functions
const saveMovies = async () => {
    let transferdMovies = await moviesDAL.getMovies();
    transferdMovies.map((movie) => {
        let newMovie = new movies({
            name: movie.name,
            genres: movie.genres,
            image: movie.image.medium,
            premiered: movie.premiered
        });
        newMovie.save(err => {
            if (err) { console.log(err) } else {
                return (newMovie);
            };
        });
    });
};
const deleteAll = async () => {
    movies.deleteMany({});
};

const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        movies.find({}, (err, data) => {
            if (err) {
                reject(err);
            } else { resolve(data) }
        });
    });
};
const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
        movies.findById(id, (err, data) => {
            if (err) {
                reject(err);
            } else { resolve(data); }
        });
    });
};
const updateMovie = (id, updatedMovie) => {
    return new Promise((resolve, reject) => {
        movies.findByIdAndUpdate(id, {
            name: updatedMovie.name,
            genres: updatedMovie.genres,
            image: updatedMovie.image,
            premiered: updatedMovie.premiered
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("updated");
            };
        });
    });
};
const createMovie = (newMovieToAdd) => {
    return new Promise((resolve, reject) => {
        let newMovie = new movies({
            name: newMovieToAdd.name,
            genres: newMovieToAdd.genres,
            image: newMovieToAdd.image,
            premiered: newMovieToAdd.premiered
        });
        newMovie.save(err => {
            if (err) {
                reject(err);
            } else {
                resolve(newMovie);
            };
        });
    });
};
const deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        movies.findByIdAndDelete(id, err => {
            if (err) {
                reject(err);
            } else {
                subsBl.removeMovie(id);
                resolve("deleted");
            };
        });

    });

};




module.exports = { saveMovies, deleteAll, getAllMovies, getMovieById, deleteMovie, updateMovie, createMovie }