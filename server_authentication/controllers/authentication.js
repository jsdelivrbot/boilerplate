const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub: subject
  // iat: issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had email and password auth'd
  // just give them a token
  // passport assigns user to req.user through done() callback
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req,res,next) {
  const email = req.body.email;
  const password = req.body.password;

  // See if user with given email exists
  User.findOne({ email: email.toLowerCase() }, (err, existingUser) => {
    if (err) return next(err);

    // handle required fields
    if ((!email) || (!password)) {
      return res.send({ error: "You must provide an Email and a passowrd" });
    }
    // If User with email DOES exists - return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }
    // If User with email does NOT exist - create User record
    const user = new User({ email, password });
    user.save((err) => {
      if (err) return next(err);
      // respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}
