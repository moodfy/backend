import passport = require('passport')
import { Strategy } from 'passport-spotify'
import { User } from '../models/user';

passport.use(
    new Strategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.REDIRECT_URI,
        },
        async function (accessToken, _refreshToken, _expires_in, profile, done) {
            try {
                let user = await User.findOne({
                    where: {
                        spotifyId: profile.id,
                    },
                })
                if (!user) {
                    user = new User()
                    user.spotifyId = profile.id
                    user.userName = profile.username
                    user.acessToken = accessToken
                    user.save()
                }
                else {
                    user.acessToken = accessToken
                    user.save()
                }
                return done(null, profile);
            } catch (error) {
                console.error(error)
                return done(error, profile);
            }
        }
    )
);
