const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) { //JWT varten   https://jwt.io
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret); //eka argumentti  , toka argumentti secretti joka maaritettiin configissa
    // sub on subject, kelle tokeni kuuluu
    // iat on jwt:n oma juttu (issue at time)
}

//kirjautuminen
exports.signin = function (req, res, next) {
    //User has already had their email and password auth'd
    // we just need to give them a token
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function (req, res, next) {
    //  res.send({ success: 'true' });
    console.log(req.body); //tieto mita syotetaan sisaan (front end puolelta)
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: ' You must provide email and password' });
    }

    //see if a user with the given email exists
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) { return next(err); }

        //If a user with email does exitsts,r eturn an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }
        // If a user with email does NOT exist, create and save user record
        const user = new User({ // Pitaa vastaa tehtya Schemaa
            email: email,
            password: password
        });
        user.save(function (err) { //Tallentaa tietokantaan
            if (err) { return next(err); }
            // Respond to request, user was created

            //  res.json(user); //res eli lahettaa vastauksen
            res.json({ token: tokenForUser(user) }); // TOKENI KAYTTAJALLE
        });
    });
}