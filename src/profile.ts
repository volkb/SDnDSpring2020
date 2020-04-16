import express from "express";
import { NextFunction, Request, Response } from "express";
import { isAuthenticated } from "./config/passport";
import { DBManager } from "./server";
import { User } from "./models/UserAPI";
import { extname, join } from "path";
import multer from "multer";

const storageHandler = multer.diskStorage({
    destination: join(__dirname, "../data/pictures"),
    filename: (req,  file, done) => {
        if (req.user) {
            done(null, (req.user as User).oauth_token + extname(file.originalname));
        } else {
            done(new Error("File uploadeded from unauthenticated user!"), "ERROR" + file.mimetype);
        }
    }
});
const uploadHandler = multer({
    storage: storageHandler,
    // Limit to 1 10MB photo
    limits: {fileSize: 10000000, files: 1},
    fileFilter: (req, file, done) => {
        const extension = extname(file.originalname);
        if (extension.toLowerCase() == ".jpg" || extension.toLowerCase() == ".png" || extension.toLocaleLowerCase() == ".jpeg") {
            done(null, true);
        } else {
            return done(new Error("Invalid file type"));
        }
    },

});

export const profileRouter = express.Router();

profileRouter.get("/", isAuthenticated, async (req, res) => {
    const oauth_token = (req.user as User)?.oauth_token;
    const user = await User.find(oauth_token);
    res.send(user);
});

// This handles error checking to see if the picture is of the correct type
function profileUpload(req: Request, res: Response, next: NextFunction): void {
    const handler = uploadHandler.single("picture");
    handler(req, res, (err) => {
        if (err) {
            const message = "Incorrect file type! Only images are allowed";
            res.redirect(`/edit_profile?err=${encodeURIComponent(message)}`);
        } else {
            next();
        }
    });
}

profileRouter.post("/update", isAuthenticated, profileUpload, async (req, res) => {
    const user = req.user as User;
    if (req.file) {
        req.body.picture = req.file.filename;
    } else {
        req.body.picture = user.picture;
    }
    user.updateUserProfile(req.body);
    res.redirect("/edit_profile");
    
});

profileRouter.get("/state/:country_id", async (req, res) => {
    const states = await DBManager.executeQuery("SELECT * FROM state WHERE country_id=?;", [req.params.country_id]);
    res.send(states);
});

profileRouter.get("/country", async (req, res) => {
    const countries = await DBManager.executeQuery("SELECT * FROM country;", []);
    res.send(countries);
});

profileRouter.get("/country/:country_id", async (req, res) => {
    const country = await DBManager.executeQuery("SELECT * FROM country WHERE id=? LIMIT 1;", [req.params.country_id]);
    res.send(country);
});

profileRouter.get("/school", async (req, res) => {
    const schools = await DBManager.executeQuery("SELECT * FROM school;", []);
    res.send(schools);
});

profileRouter.get("/major/:school_id", async (req, res) => {
    const majors = await DBManager.executeQuery("SELECT * FROM major WHERE school_id=?;", [req.params.school_id]);
    res.send(majors);
});

profileRouter.get("/major", async(req, res) => {
    const majors = await DBManager.executeQuery("SELECT * FROM major;", []);
    res.send(majors);
});

// Gets all the clubs in the DB
profileRouter.get("/club", async (req, res) => {
    const clubs = await DBManager.executeQuery("SELECT * FROM clubs;", []);
    // Maybe convert this to Club objects at some point? Doesn't really matter as it immediately turns back to JSON
    res.send(clubs);
});

// Gets all the users in the DB
profileRouter.get("/users", async (req, res) => {
    const users = await DBManager.executeQuery("SELECT id, first_name, last_name, isadmin FROM user;", []);
    res.send(users);
});