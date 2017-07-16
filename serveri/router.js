const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//passport haluaa tehda cookie pohjaisen istunnen, sen vuoksi session false
//joka estaa cookien
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    /*
    app.get('/', function (req, res, next) { //next tarkoitettu erroreiden kasittelyyn
        res.send(['waterbottle', 'phone', 'paper']);
    });
    */
    app.get('/', requireAuth, function (req, res) {
        res.send({ message: 'Super secret code is ABS1123123' });
    });
    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup);

}