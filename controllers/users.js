const User = require('../models/user');

module.exports.renderRegister =  (req, res)=>{
    res.render('users/register')
}

module.exports.registerUser =  async(req, res, next)=>{
    try{
        const {email, username, password}= req.body;
        const user = new User({email, username});
        const registeredUser= await User.register(user, password); 
        console.log(registeredUser);
        req.login(registeredUser, err =>{
            if (err) return next(err);
            req.flash('Welcome to Jerry Yelpcamp');
            res.redirect('/campgrounds');
        })
    }catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.userLogin =  (req, res)=>{
    res.render('users/login')
}

module.exports.postLogin =  (req, res)=>{
    req.flash('success', 'WELCOME BACK');
    res.redirect('/campgrounds');
}

module.exports.userLogout = function(req, res){
    req.logout(function(){
      req.flash('success', 'YOU ARE LOGGED OUT');
      res.redirect('/campgrounds');
    });
  }