const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.get = (req, res, next) => {
    const userId = req.params.id;
    if (mongoose.Types.ObjectId.isValid(userId)) {
        User.findOne({ _id: req.params.id })
            .then(user => {
                if (user) {
                    res.json(user);
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            })
            .catch(err => next(err));
    } else {
        res.status(400).json({ message: 'Invalid user id' });
    }
}

module.exports.create = (req, res, next) => {
    const user = new User(req.body);

    User.findOne({ email: user.email })
        .then(existingUser => {
            if (existingUser) {
                res.status(400).json({ message: 'Email unavailable'});
            } else {
                user.save()
                    .then(() => {
                        res.status(200).json(user);
                    })
                    .catch(err => next(err));
            }
        })
        .catch(err => next(err));
}

module.exports.list = (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => next(err));
}