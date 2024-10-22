import passportFacebook from "passport-facebook";
import { PassportStatic } from "passport";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/UserAPI";

const FacebookStrategy = passportFacebook.Strategy;
export function configurePassport(passport: PassportStatic): void {
    passport.use(new FacebookStrategy({
        clientID:  process.env.FACEBOOK_APP_ID as string,
        clientSecret: process.env.FACEBOOK_SECRET as string,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "email", "gender", "name"],
        passReqToCallback: true
    }, async (req: any, accessToken, refreshToken, profile, done) => {
        // This is where the authentication with facebook happens
        let email = "";
        if (profile.emails) {
            email = profile.emails[0].value;
        }
        // Some fields are undefined so ?. is a safe dereference
        const authed_user = await User.findOrCreate(profile.id, profile.name?.givenName, profile.name?.familyName, email);
        if (authed_user.success) {
            done(null, authed_user.data);
        } else {
            done(authed_user.error);
        }
    }));

    // Serializes and deserializes the user into and out of the cookie
    passport.serializeUser((user: User, done) => {
        done(null, user.oauth_token);
    });
    
    passport.deserializeUser(async (oauth_token: string, done) => {
        const user_response = await User.find(oauth_token);
        if (user_response.success) {
            done(null, user_response.data);
        } else {
            done(user_response.error);
        }
    });
}

// Authentication guard, prevents user from advancing if their request is not authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};
