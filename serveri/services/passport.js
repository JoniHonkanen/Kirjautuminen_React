// AUTTAA TUNNISTAMAAN VIERAILIAN (Logged or not)
// http://passportjs.org/docs
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = { usernameField: 'email' }; //koska tunnistus sahkopostilla, ei userNamella
const localLogin = new LocalStrategy( localOptions , function (email, password, done) {
    //Verify this email and pasword, call done witht the user
    //if it is the correct email and password, otherwise call done with false
    User.findOne({ email: email.toLowerCase() }, function (err, user) { //email on user.js scheman email. Tietokannasta etsitaan
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        //compare passwords, is 'password' equal to user.password (tallennettu salasana)
        user.comparePassword(password, function (err, isMatch) { //verrataan tulee ja tallennettua salasanaa
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, user);
        });
    });
});


// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret //configin tiedoston secret
};


//Create JWT strategy , Huom on olemassa eri strategyja, tassa kaytetaan jwt
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    //payload : decoded jwt tokeni (authentication tiedoston sub:user.id kohta)
    // done callback functioni kun onnistuu tunnistautuminen

    // See if user ID in the playload exists in our database
    //If it does, call done with that user
    // otherwise call done without a user object
    User.findById(payload.sub, function (err, user) {
        if (err) { return done(err, false); } //jos tulee errori

        if (user) { // Jos kayttaja loytyy
            done(null, user);
        } else { // Jos kayttaja ei loydy
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);