import express, { Application } from 'express'
import compression from 'compression'
import cors from 'cors'
import { createNamespace } from 'cls-hooked'
import { NextFunction, Request, Response } from 'express'
import session = require('express-session')
import passport = require('passport')
import consolidate = require('consolidate')
import { ShreknessRoute } from './routes/shrekness.routes'

class App {
    public express: Application = express();

    constructor() {
        this.config()

        this.routes()

        this._404()
    }


    private config() {

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (obj, done) {
            done(null, obj);
        });

        if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.REDIRECT_URI) {
            return "Configurações incorretas do spotify. Cheque as variáveis de ambiente!"
        }

        this.express.set('port', process.env.PORT || 3000)
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: false }))
        this.express.use(compression())
        this.express.use(cors())
        this.express.set('views', __dirname + '/views');
        this.express.set('view engine', 'html');
        this.express.use(
            session({ secret: 'hakuna matata', resave: true, saveUninitialized: true })
        );

        createNamespace('session')

        this.express.use(passport.initialize());
        this.express.use(passport.session());

        this.express.use(express.static(__dirname + '/public'));

        this.express.engine('html', consolidate.nunjucks);


    }

    private routes(): void {
        this.express.use(function (req: Request, res: Response, next: NextFunction) {
            res.header("x-powered-by", "moodfy")
            next()
        })

        this.express.use('/', new ShreknessRoute().router)

        this.express.get('/login', function (req: Request, res: Response) {
            res.render('login.html', { user: req.user });
        });
        
        this.express.get(
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
        this.express.get(
            process.env.AUTHCALLBACKPATH,
            passport.authenticate('spotify', { failureRedirect: '/login' }),
            function (_req: Request, res: Response) {
                res.redirect('/');
            }
        );
    
        this.express.get('/logout', function (req: Request, res: Response) {
            req.logout();
            res.redirect('/');
        });

    }

    private _404(): void {
        this.express.use((req: Request, res: Response) => {
            res.sendStatus(404)
        })
    }
}

const app = new App()
export default app.express