import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "../auth/passportHandler";
import { User } from "../models/user";


export class AuthController {

  public authenticateJWT(req: Request, res: Response, next: NextFunction): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    passport.authorize("jwt", { session: false }, function (err, user: User, jwtToken) {
      if (err || !user) {
        return res.status(401).json({ status: "error", message: "unauthorized" });
      } else {
        req.user = user
        return next();
      }
    })(req, res, next);
  }

}
