const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewId: String,
    reviewerName: String,
    reviewsRating: Number,
    reviewerGender: String,
    reviewContent: String
})
module.exports = mongoose.model('Review', reviewSchema)