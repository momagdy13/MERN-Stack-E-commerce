const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");


passport.use(
  new GoogleStrategy(
    { 
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLINT_SECRET,
      callbackURL: `${process.env.CLINT_BACK_URL}/googleauth/google/callback`,
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile,  callback) {
      console.log("Profile Data");
      console.log(profile);
      callback(null, profile)
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
