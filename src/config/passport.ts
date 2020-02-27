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
        // This is where the authentication with facebook happens
        let email = "";
        if (profile.emails) {
            email = profile.emails[0].value;
        }
        // Some fields are undefined so ?. is a safe dereference
        const authed_user = new User(profile.id, profile.name?.givenName, profile.name?.familyName, email, accessToken);
        // We would find or create the user based on their profile id and then form the user object rather than hardcoding like this
        done(null, authed_user);
    }));

    // Serializes and deserializes the user into and out of the cookie
    passport.serializeUser((user: User, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id: number, done) => {
        // Here is where the get user from database would happen
        done(null, id);
    });
}

// Authentication guard, prevents user from advancing if their request is not authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};
