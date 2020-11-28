const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { User } = require("../db");
const { CLIENT_ID_GOOGLE, CLIENT_SECRET_GOOGLE } = process.env;

passport.use(
	new GoogleStrategy(
		{
			clientID: CLIENT_ID_GOOGLE,
			clientSecret: CLIENT_SECRET_GOOGLE,
			callbackURL: "https://api-henrycomics.herokuapp.com/auth/google/callback",
		},
		function (accessToken, refreshToken, profile, cb) {
			const user = profile._json;
			console.log("googleUser", user);

			User.findOrCreate({
				where: {
					email: user.email,
				},
				defaults: {
					username: user.given_name,
					email: user.email,
					password: user.sub,
				},
			}).then((user) => {
				console.log(user);
				cb(null, user[0]);
			});
		}
	)
);
