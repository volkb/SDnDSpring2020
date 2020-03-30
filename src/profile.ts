import express from "express";
import { isAuthenticated } from "./config/passport";
import { DBManager } from "./server";
import { User } from "./models/UserAPI";

export const profileRouter = express.Router();

profileRouter.get("/", isAuthenticated, async (req, res) => {
    const oauth_token = (req.user as User)?.oauth_token;
    const user = await User.find(oauth_token);
    res.send(user);
});

profileRouter.post("/update", isAuthenticated, async (req, res) => {
    if (req.user) {
        const user = req.user as User;
        user.updateUserProfile(req.body);
    }
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