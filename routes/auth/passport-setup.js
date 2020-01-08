const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const getConnection = require("../../db");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (email, password, done) => {
      const queryString = "SELECT * FROM User WHERE email = (?)";
      getConnection.query(queryString, email, (err, results) => {
        if (err || results.length < 1) {
          return done(null, false);
        }
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
          if (isMatch)
            return done(null, results[0], {
              message: "Successfully signed in"
            });
          return done(null, false, { message: "Password incorrect" });
        });
      });
    }
  )
);

module.exports = passport;
