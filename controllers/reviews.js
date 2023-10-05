const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.createReview= async(req, res) => {
    const params = req.params.id; // use req.params.id as the value for params
    const campground = await Campground.findById(params);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'NEW REVIEW CREATED!!')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.delete= async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'REVIEW DELETED!!');
    res.redirect(`/campgrounds/${id}`);
}