require('./passport.js');
var User = require('./user.js');

module.exports = function(app, passport) {

    app.get('/hello', isLoggedIn, function(req, res) {
        res.send('Hello, ' + req.user.facebook.name);
        res.end(200);
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/hello',
        failureRedirect: '/'
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}
