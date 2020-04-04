import express from "express";
import path from "path";
import { isAuthenticated } from "./config/passport";
import { User } from "./models/UserAPI";



export const searchRouter = express.Router();

// "/search" is just the HTML
searchRouter.get("/", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "/views/search.html"));
});

// "/search/users" finds all students by default, optionally you can include "?alumni=1" at the end to find alumni instead
searchRouter.get("/users", isAuthenticated, async (req, res) => {
    let alumni = false;
    if (req.query.alumni == "1") {
        alumni = true;
    }
    const api_response = await (req.user as User).searchAllUsers(alumni);
    res.send(api_response);
});

