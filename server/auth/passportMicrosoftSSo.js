const passport = require("passport");
const {User} = require("../models");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/v1/auth/google/callback";

passport.use(new MicrosoftStrategy({
  // Standard OAuth2 options
  clientID: 'applicationidfrommicrosoft',
  clientSecret: 'applicationsecretfrommicrosoft',
  callbackURL: "http://localhost:3000/auth/microsoft/callback",
  scope: ['user.read'],

  // Microsoft specific options

  // [Optional] The tenant for the application. Defaults to 'common'. 
  // Used to construct the authorizationURL and tokenURL
  tenant: 'common',

  // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
  authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',

  // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
  tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
},
async (req, accessToken, refreshToken, profile, done) => {
  console.log("🚀 ~ file: passportGoogleSSo.js:16 ~ profile:", profile)
  //1) get Data form user profile
  const defaultUser = {
    fullName: `${profile.name.givenName} ${profile.name.familyName}`,
    email: profile.emails[0].value,
    picture: profile.photos[0].value,
    googleId: profile.id,
  };
  //2) check if user exists if not we create a new user
  try {
    const user = await User.findOrCreate({
      where: { googleId: defaultUser.googleId },
      defaults: defaultUser,
    });
    if (!user) {
      return done(new Error("something went wrong"), null);
    }
    return done(null, user[0]);
  } catch (err) {
    console.log(
      "🚀 ~ file: passportGoogleSSo.js:66 ~ passport.use ~ err",
      err
    );
    return done(err, null);
  }
}
));