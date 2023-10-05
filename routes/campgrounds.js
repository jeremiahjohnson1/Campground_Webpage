const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {campgroundSchema, reviewSchema} = require('../schemas');
const {isLoggedIn} = require('../middleware');
const e = require('connect-flash');
const multer  = require('multer');
const  ExpressError = require('../utils/ExpressError')
const upload = multer({ dest: 'uploads/'});


const validateCampground = (req, res, next) => {   
    const { error } = campgroundSchema.validate(req.body.campground);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
}


const isAuthor = async(req, res, next) =>{
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if(campground.author.equal(req.user._id)){
        req.flash('error', 'YOU CANNOT DO THAT!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
 
router.route('/')
   .get(catchAsync(campgrounds.index))
   .post(isLoggedIn, validateCampground, upload.array('image'), catchAsync(campgrounds.createCampground))
router.get('/new', isLoggedIn, campgrounds.renderNewForm); 

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, validateCampground, isAuthor, catchAsync(campgrounds.updateCampground))
    .delete( isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCampground));

module.exports = router;


