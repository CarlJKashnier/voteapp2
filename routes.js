// ###require('./passport.js');

module.exports = function(app, passport) {

    app.get('/hello', function(req, res) {
        res.send('Hello, world!');
        res.end(200);
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}
