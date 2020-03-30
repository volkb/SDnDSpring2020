import express from "express";
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
        if (extension.toLowerCase() == ".jpg" || extension.toLowerCase() == ".png") {
            done(null, true);
        } else {
            done(null, false);
        }
    },

});

export const profileRouter = express.Router();

profileRouter.get("/", isAuthenticated, async (req, res) => {
    const oauth_token = (req.user as User)?.oauth_token;
    const user = await User.find(oauth_token);
    res.send(user);
});

profileRouter.post("/update", isAuthenticated, uploadHandler.single("picture"), async (req, res) => {
    if (req.user && req.file) {
        const user = req.user as User;
        console.log(req.file.filename);
        req.body.picture = req.file.filename;
        user.updateUserProfile(req.body);
        res.redirect("/edit_profile");
    } else {
        // CHANGE TO YOUR ERROR
        res.redirect("/photo");
    }
    
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