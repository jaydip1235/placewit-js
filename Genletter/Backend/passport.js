const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport');
const User = require('./models/userSchema');
let email = '';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        function (accessToken, refreshToken, profile, callback) {
            console.log(profile);
            email = profile.emails[0].value;
            
            // let user = User.findOne({ googleId: profile.id });
            // if(!user){

            // }

            User.findOne({ googleId: profile.id }, (err, user) => {
                if (!user) {
                    User.create({
                        googleId: profile.id,
                        email: profile.emails[0].value
                    });
                }
            });
            callback(null, profile);
        }
    )
);

/* `passport.serializeUser` is a method provided by the Passport.js library that is used to serialize
the user object into the session. This method is called after a user is authenticated and its
purpose is to determine which data of the user object should be stored in the session. In this case,
the `serializeUser` method is simply passing the entire user object to the `done` callback function,
which signals that the serialization process is complete. */
passport.serializeUser((user, done) => {
    done(null, user);
});

/* `passport.deserializeUser` is a method provided by the Passport.js library that is used to
deserialize the user object from the session. This method is called every time a request is made to
the server and its purpose is to retrieve the user object from the session and make it available in
the request object. In this case, the `deserializeUser` method is simply passing the entire user
object to the `done` callback function, which signals that the deserialization process is complete. */
passport.deserializeUser((user, done) => {
    done(null, user);
});

// module.expeorts = email;

module.exports.getUserEmail = function () {
    return new Promise((resolve, reject) => {
        if (email) {
            resolve(email);
        }
    });
};