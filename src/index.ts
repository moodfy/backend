import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require("express");
import { Request, Response } from "express";
import { User } from "./entity/User";
import passport = require('passport')
import { Strategy } from 'passport-spotify'
import session = require('express-session')
import { ensureAuthenticated } from './middleware/auth'
import consolidate = require('consolidate')
import { recentlyPlayedService } from "./services/recentlyPlayedService";
import { audioFeaturesService } from "./services/audioFeaturesService";
import { valenceService } from "./services/valenceService";
import { artistService } from "./services/artistsService";
import 'dotenv/config';
import { albumService } from "./services/albumService";

interface AlbumAudioAnalisys {
    y: number;
    id: string;
    x: number;
    label: string;
    album: string;
    r: number
}

interface Dataset {
    label: string,
    data: [{
        y: number,
        x: number,
        r: number
    }],
}
createConnection().then(async connection => {

    const authCallbackPath = '/callback';

    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session. Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing. However, since this example does not
    //   have a database of user records, the complete spotify profile is serialized
    //   and deserialized.
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    // Use the SpotifyStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, expires_in
    //   and spotify profile), and invoke a callback with a user object.

    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.REDIRECT_URI) {
        return "Configurações incorretas do spotify. Cheque as variáveis de ambiente!"
    }

    passport.use(
        new Strategy(
            {
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                callbackURL: process.env.REDIRECT_URI,
            },
            async function (accessToken, _refreshToken, _expires_in, profile, done) {
                try {
                    let user = new User()
                    user.spotifyId = profile.id
                    user.userName = profile.username
                    user.acessToken = accessToken
                    await connection.manager.save(connection.manager.create(User, user))
                    return done(null, profile);
                } catch (error) {
                    return done(error, profile);
                }
            }
        )
    );

    var app = express();

    // configure Express
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');

    app.use(
        session({ secret: 'hakuna matata', resave: true, saveUninitialized: true })
    );
    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(__dirname + '/public'));

    app.engine('html', consolidate.nunjucks);

    app.get('/', ensureAuthenticated, async function (req: Request, res: Response) {
        const user = req.user as any
        const userDb = await connection.manager.findOne(User, { spotifyId: user.id })

        if (userDb) {
            // console.log(userDb)
            const recentes = await recentlyPlayedService.getRecentPlayed(userDb.acessToken)

            let tracks = ''
            recentes.items.forEach((element: { track: { id: string; }; }) => {
                tracks += element.track.id + `,`
            });

            const audioFeatures = await audioFeaturesService.getMultipleAudioFeatures(userDb.acessToken, tracks)
            // https://open.spotify.com/artist/77Dl9332vjr060pj5LbWuN?si=LkoeaQ44Rl-2XBzS46mFvA
            // anum preto 01zIROcqWjGFgVJxYGxq9O
            // const albuns = await artistService.getArtistsAlbums(userDb.acessToken, '01zIROcqWjGFgVJxYGxq9O')

            // let tracks = ''
            let audioAnalisys: AlbumAudioAnalisys
            let result: AlbumAudioAnalisys[] = []
            // let audioFeatures
            let trackResult
            let label = []
            let dataset: Dataset[] = []
            // for (const element of albuns.items) {
                // trackResult = await albumService.getAlbumTracks(userDb.acessToken, element.id)
            //     for (const iterator of trackResult.items) {
            //         tracks += iterator.id + ','
            //     }

            // audioFeatures = await audioFeaturesService.getMultipleAudioFeatures(userDb.acessToken, tracks)
            tracks = ''
            if (typeof audioFeatures !== 'undefined') {
                for await (const track of recentes.items) {
                    for await (const audioFeature of audioFeatures.audio_features) {
                        if (JSON.stringify(audioFeature.id) === JSON.stringify(track.track.id)) {
                            audioAnalisys = {
                                y: audioFeature.energy,
                                id: audioFeature.id,
                                x: audioFeature.valence,
                                label: track.track.name,
                                album: track.track.artists[0].name,
                                r: 10
                            }
                            label.push(track.track.name)
                            result.push(audioAnalisys)
                        }
                    }
                }
            }
            // }
            // console.log(audioFeatures)
            const resultado = await valenceService.calculaValencia(audioFeatures)
            res.render('index.html', { resultado, user: req.user, result, label });

        }
    });

    app.get('/login', function (req: Request, res: Response) {
        res.render('login.html', { user: req.user });
    });
    // GET /auth/spotify
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request. The first step in spotify authentication will involve redirecting
    //   the user to spotify.com. After authorization, spotify will redirect the user
    //   back to this application at /auth/spotify/callback

    app.get(
        '/auth/spotify',
        passport.authenticate('spotify', {
            scope: ['user-read-email', 'user-read-private', 'user-top-read', 'user-read-recently-played'],
        })
    );

    // GET /auth/spotify/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request. If authentication fails, the user will be redirected back to the
    //   login page. Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get(
        authCallbackPath,
        passport.authenticate('spotify', { failureRedirect: '/login' }),
        function (_req: Request, res: Response) {
            res.redirect('/');
        }
    );

    app.get('/logout', function (req: Request, res: Response) {
        req.logout();
        res.redirect('/');
    });

    app.listen(process.env.PORT || 3000, function () {
        console.log('App is listening on port ' + process.env.PORT || 3000);
    });

}).catch(error => console.log(error));

