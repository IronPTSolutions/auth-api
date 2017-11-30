const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
const User = require('../models/user.model');

module.exports.setup = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, done);
    });

    passport.use('local-auth', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, function(email, password, next) {
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    next(null, false, { message: 'Invalid username or password.'});
                } else {
                    user.checkPassword(password)
                        .then(match => {
                            next(null, user);
                        })
                        .catch(err => next(err));
                }
            })
            .catch(err => next(err));
    }));
}

module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}
