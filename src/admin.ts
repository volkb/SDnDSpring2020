import express, { NextFunction, Request, Response } from "express";
import { User } from "./models/UserAPI";
import { isAuthenticated } from "./config/passport";
import path from "path";

export const adminRouter = express.Router();

// Authentication guard, prevents user from advancing if their request isn't an admin
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if ((req.user as User)) {
        return next();
    }
    res.redirect("/");
};

adminRouter.get("/", isAuthenticated, isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname + "/views/admin_page.html"));
});