const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("../db");
const { CLIENT_ID_FACEBOOK, CLIENT_SECRET_FACEBOOK } = process.env;

passport.use(
	new FacebookStrategy(
		{
			clientID: CLIENT_ID_FACEBOOK,
			clientSecret: CLIENT_SECRET_FACEBOOK,
			callbackURL: "http://localhost:3001/auth/facebook/callback",
			profileFields: ["id", "displayName", "photos", "email"],
		},
		function (accessToken, refreshToken, profile, done) {
			let user = profile.displayName.replace(/\s+/g, "-").toLowerCase();

			User.findOrCreate({
				where: { email: `${user}@henrycomics.com` },
				defaults: {
					username: profile.displayName,
					email: `${user}@henrycomics.com`,
					password: profile.id,
				},
			}).then((resp) => {
				done(null, resp[0]);
			});
		}
	)
);
