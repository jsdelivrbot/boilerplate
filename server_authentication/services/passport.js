const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = {
  usernameField: 'email' // tell asswort what the login name is
  // password is found automatically
}
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this username and passowrd, call done with user if credentials
  // are correct, otherwise call done with false
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);

    // compare passowrd
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);

      return done(null, user);
    })
  });
})

// Setup options for JWT Strategy
const jwtOptions = {
  // tell passport where to look for tokenForUser
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // Check if user ID in payload exists in DB
  // If so, call done with it, otherwise without user object
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);
    if (user) done(null, user)
    else return done(null, false);
  });
});

// TEll passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
