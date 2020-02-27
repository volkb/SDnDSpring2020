import passportFacebook from "passport-facebook";
import { PassportStatic } from "passport";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

const FacebookStrategy = passportFacebook.Strategy;
export function configurePassport(passport: PassportStatic): void {
    passport.use(new FacebookStrategy({
        clientID:  process.env.FACEBOOK_APP_ID as string,
        clientSecret: process.env.FACEBOOK_SECRET as string,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "email", "gender", "name"],
        passReqToCallback: true
    }, (req: any, accessToken, refreshToken, profile, done) => {
        let email = "";
        if (profile.emails) {
            email = profile.emails[0].value;
        }
        const authed_user = new User(profile.id, profile.name?.givenName, profile.name?.familyName, email, accessToken);
        done(null, authed_user);
    }));

    passport.serializeUser((user: User, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id: number, done) => {
        done(null, id);
    });
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};
