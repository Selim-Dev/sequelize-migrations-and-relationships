const passport = require("passport");
const passportJwt = require("passport-jwt");
const {User} = require("../models");


passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      console.log("🚀 ~ file: passport.js:12 ~ payload:", payload)
      try {	
        const user = await User.findOne({ where: { id: payload.id } });
        if (!user) {
					const err = new Error("User not found here");
          return done(err, null);
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
