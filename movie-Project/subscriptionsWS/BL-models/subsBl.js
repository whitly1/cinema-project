const subs = require('../mongoose-models/subsModel');
// functions
const getAllSubs = () => {
    return new Promise((resolve, reject) => {
        subs.find({}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            };
        });
    });
};
const getSubById = (id) => {
    return new Promise((resolve, reject) => {
        subs.findById(id, (err, data) => {
            if (err) {
                reject(err);
            } else { resolve(data) }
        });
    });
};
const updateSub = (id, updatedSub) => {
    return new Promise((resolve, reject) => {
        subs.findByIdAndUpdate(id, {
            memberId: updatedSub.memberId,
            movies: updatedSub.movies
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("updated");
            };
        });
    });
};
const createSub = (newSubToAdd) => {
    return new Promise((resolve, reject) => {
        let newSub = new subs({
            memberId: newSubToAdd.memberId,
            movies: newSubToAdd.movies
        });
        newSub.save((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(newSub);
            };
        });
    });
};
const deleteSub = (id) => {
    return new Promise((resolve, reject) => {
        subs.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("deleted");
            };
        });
    });
};
const removeMovie = async (movieId) => {
    let allSubs = await getAllSubs();
    allSubs.forEach(sub => {
        sub.movies.forEach(movie => {
            if (movie.id == movieId) {
                let updatedMovies = sub.movies.filter(movie => {
                    if (movie.id != movieId) {
                        return movie;
                    };
                })
                sub.movies = updatedMovies;
                sub.save(err => {
                    if (err) { console.log(err) } else { return ("saved") }
                });
            };
        });
    });
};

module.exports = { getAllSubs, getSubById, updateSub, createSub, deleteSub, removeMovie }