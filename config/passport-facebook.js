/**
 * Created by sachin.ghumnar on 16-07-2017.
 */
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (User) {
    return new FacebookStrategy({ 
            clientID: "550248188483925",
            clientSecret: "e194ab2ec46f73911fe8d838b6e65355",
            callbackURL: "http://localhost:3000/user/login/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({
                'facebook.id': profile.id
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: "adb@abc.com",
                        username: profile.username,
                        provider: 'facebook',
                        //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                        facebook: profile._json
                    });
                    user.save(function (err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    //found user. Return
                    return done(err, user);
                }
            });
        }
    );
};