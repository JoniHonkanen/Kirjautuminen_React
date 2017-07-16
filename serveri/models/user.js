const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true }, //tarkistaa ettei muita vastaavia sahkoposteja ole
    password: String
});
// On save hok, encrypt password
// Before saving a model, run this fuction
userSchema.pre('save', function (next) { // SALASANAN CRYPSTAUS LAHTEE TASTA, pre tarkoittaa ennen tallennusta authentications tiedostossa
    // get access to user model
    const user = this;

    //generate a salt then run callback
    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err); }

        //  encrypt password using salt
        bcrypt.hash(user.password, salt, null, function (err, hash) { //hash on cryptattu salasana tassa vaiheessa

            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        })
    })
});

//Salasanojen vertailu
//methods mahdollistaa funktiohin paasyn
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    //verrataan mahdollista salasanaa tallennettuun salasanaan
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    })
}

// Craete the model class
const ModelClass = mongoose.model('user', userSchema); //"lataa scheman mongooseen"
//tietokantaan tulee nimi "user"

//Export the model
module.exports = ModelClass;
