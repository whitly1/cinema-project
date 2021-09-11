const mongoose = require('mongoose');
let subscriptionsSchema = new mongoose.Schema({
    memberId: String,
    movies: [{
        movieId: String,
        dateOfMovie: Date
    }
    ]
});
module.exports = mongoose.model('subscriptions', subscriptionsSchema)