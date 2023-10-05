const {campgroundSchema, reviewSchema} = require('./schemas');
const ExpressError = ('/.utils/ExpressError');
const Campground = require('./models/campground');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTO = req.originalUrl
        req.flash('error', 'YOU MUST BE SIGNED IN');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {   
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
}

module.exports.isAuthor = async(req, res, next) =>{
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if(campground.author.equal(req.user._id)){
        req.flash('error', 'YOU CANNOT DO THAT!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {   
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
}
