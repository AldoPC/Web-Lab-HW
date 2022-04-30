var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var GoogleStrategy = require('passport-google-oidc');
let GitHubStrategy = require('passport-github2')
let FacebookStrategy = require('passport-facebook')
var db = require('../db');
var router = express.Router();

passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [username], function (err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, row);
        });
    });
}));

//Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile']
},
    function (issuer, profile, cb) {
        //console.log(profile)
        db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
            issuer,
            profile.id
        ], function (err, row) {
            if (err) { return cb(err); }
            if (!row) {
                db.run('INSERT INTO users (name) VALUES (?)', [
                    profile.displayName
                ], function (err) {
                    if (err) { return cb(err); }

                    var id = this.lastID;
                    db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
                        id,
                        issuer,
                        profile.id
                    ], function (err) {
                        if (err) { return cb(err); }
                        var user = {
                            id: id,
                            name: profile.displayName
                        };
                        return cb(null, user);
                    });
                });
            } else {
                db.get('SELECT rowid AS id, * FROM users WHERE rowid = ?', [row.user_id], function (err, row) {
                    if (err) { return cb(err); }
                    if (!row) { return cb(null, false); }
                    return cb(null, row);
                });
            }
        });
    }));

//Github strategy
passport.use(new GitHubStrategy({
    clientID: process.env['GITHUB_CLIENT_ID'],
    clientSecret: process.env['GITHUB_CLIENT_SECRET'],
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's GitHub profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the GitHub account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
));


//Facebook strategy
passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's GitHub profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the GitHub account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/login', function (req, res, next) {
    res.render('login');
});
router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/signup', function (req, res, next) {
    res.render('signup');
});

router.post('/signup', function (req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err) { return next(err); }
        db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
            req.body.username,
            hashedPassword,
            salt
        ], function (err) {
            if (err) { return next(err); }
            var user = {
                id: this.lastID,
                username: req.body.username
            };
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.redirect('/');
            });
        });
    });
});

router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res, next) {
        db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
            'https://www.facebook.com',
            req.federatedUser.id
        ], function (err, row) {
            if (err) { return next(err); }
            if (!row) {
                db.run('INSERT INTO users (name) VALUES (?)', [
                    req.federatedUser.displayName
                ], function (err) {
                    if (err) { return next(err); }

                    var id = this.lastID;
                    db.run('INSERT INTO federated_credentials (provider, subject, user_id) VALUES (?, ?, ?)', [
                        'https://www.facebook.com',
                        req.federatedUser.id,
                        id
                    ], function (err) {
                        if (err) { return next(err); }
                        var user = {
                            id: id.toString(),
                            displayName: req.federatedUser.displayName
                        };
                        req.login(user, function (err) {
                            if (err) { return next(err); }
                            res.redirect('/');
                        });
                    });
                });
            } else {
                db.get('SELECT rowid AS id, username, name FROM users WHERE rowid = ?', [row.user_id], function (err, row) {
                    if (err) { return next(err); }

                    // TODO: Handle undefined row.
                    var user = {
                        id: row.id.toString(),
                        username: row.username,
                        displayName: row.name
                    };
                    req.login(user, function (err) {
                        if (err) { return next(err); }
                        res.redirect('/');
                    });
                });
            }
        });
    })

router.get('/auth/facebook',
    passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { assignProperty: 'federatedUser', failureRedirect: '/login' }),
    function (req, res, next) {
        db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
            'https://www.facebook.com',
            req.federatedUser.id
        ], function (err, row) {
            if (err) { return next(err); }
            if (!row) {
                db.run('INSERT INTO users (name) VALUES (?)', [
                    req.federatedUser.displayName
                ], function (err) {
                    if (err) { return next(err); }

                    var id = this.lastID;
                    db.run('INSERT INTO federated_credentials (provider, subject, user_id) VALUES (?, ?, ?)', [
                        'https://www.facebook.com',
                        req.federatedUser.id,
                        id
                    ], function (err) {
                        if (err) { return next(err); }
                        var user = {
                            id: id.toString(),
                            displayName: req.federatedUser.displayName
                        };
                        req.login(user, function (err) {
                            if (err) { return next(err); }
                            res.redirect('/');
                        });
                    });
                });
            } else {
                db.get('SELECT rowid AS id, username, name FROM users WHERE rowid = ?', [row.user_id], function (err, row) {
                    if (err) { return next(err); }

                    // TODO: Handle undefined row.
                    var user = {
                        id: row.id.toString(),
                        username: row.username,
                        displayName: row.name
                    };
                    req.login(user, function (err) {
                        if (err) { return next(err); }
                        res.redirect('/');
                    });
                });
            }
        });
    })

module.exports = router;