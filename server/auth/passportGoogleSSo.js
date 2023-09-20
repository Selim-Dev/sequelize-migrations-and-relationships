const passport = require("passport");
const {User} = require("../models");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/v1/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log("🚀 ~ file: passportGoogleSSo.js:16 ~ profile:", profile)
      //1) get Data form user profile
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
        role: 'User'
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
  )
);

// second parameter to the callback function is the verifying callback function which is called after the user has been verified, we use it to create a new user if the user doesn't exist or return the user to the passport library if the user exists

passport.serializeUser((user, done) => {
  done(null, user.id);
});



passport.deserializeUser(async (id, done) => {
	try{
		const  user = await User.findOne({ where: { id } });
		if (!user) {
			return done(new Error("User not found"), null);
		}
		return done(null, user);

	} catch (err) {
		return done(err, null);
	}
});
