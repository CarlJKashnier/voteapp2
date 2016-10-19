var FacebookStrategy = require('passport-facebook').Strategy;
var User = require("./user.js");

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('facebook', new FacebookStrategy({
            clientID: process.env.fb_appID,
            clientSecret: process.env.fb_appSecret,
            callbackURL: 'http://localhost:8888/auth/facebook/callback'
        },

        function(accessToken, refreshToken, profile, callback) {
            process.nextTick(function() {
              console.log(profile)
                User.findOne({
                    'facebook.id': profile.id
                }, function(err, user) {
                    if (err)
                        return callback(error);
                    if (user)
                        return callback(null, user);
                    else {
                        var newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name = profile.displayName;
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return callback(null, newUser);
                        });
                    }
                });
            });
        }));
};
