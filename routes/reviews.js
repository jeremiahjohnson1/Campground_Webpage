const express = require('express');
const router = express.Router({ mergeParams: true });
const {validateReview} = require('../middleware');
const Review = require('../models/review');
const Campground = require('../models/campground');
const reviews = require('../controllers/reviews');
const {campgroundSchema, reviewSchema} = require('../schemas');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


router.post('/', validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', catchAsync(reviews.deleteReview))

module.exports = router;