const passport = require('passport');

module.exports.authenticate = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
    } else {
        passport.authenticate('local-auth', (err, user, message) => {
            if (err) {
                next(err);
            } else if (!user) {
                res.status(401).json(message);
            } else {
                req.login(user, (err) => {
                    if (err) {
                        next(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        })(req, res, next);
    }
}

module.exports.logout = (req, res, next) => {
    req.logout();
}