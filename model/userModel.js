var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    username: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    userStatus: {
        type: String,
        default: true
    },
    securityQuestion:{
        type:String,
        default:"Question"
    },
    securityAnswer:{
        type:String,
        default:"Answer"
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

userModel.methods.validPassword = function (pwd) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

module.exports = mongoose.model('User', userModel);