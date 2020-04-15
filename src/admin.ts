import express, { NextFunction, Request, Response } from "express";
import { User, UserDB } from "./models/UserAPI";
import { isAuthenticated } from "./config/passport";
import path from "path";
import { Admin } from "./models/AdminAPI";

export const adminRouter = express.Router();

// Authentication guard, prevents user from advancing if their request isn't an admin
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (((req.user as User).isadmin)) {
        return next();
    }
    res.redirect("/");
};

adminRouter.get("/verify", isAuthenticated, (req, res) => {
    if (((req.user as User).isadmin)) {
        res.send({admin: true});
    } else {
        res.send({admin: false});
    }
});

adminRouter.get("/", isAuthenticated, isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname + "/views/admin_page.html"));
});

adminRouter.post("/club/add", isAuthenticated, isAdmin, async (req, res) => {
    // simple casting doesn't allow us to access the methods in admin as it is just a JSON object currently
    // we construct a new admin object from the user
    const admin = new Admin(req.user as UserDB);
    const response = await admin.createClub(req.body.label, req.body.description);
    if (!response.success) {
        res.redirect(`/admin?error=${encodeURIComponent(response.error)}`);
    } else {
        res.redirect("/admin");
    }
});

adminRouter.post("/club/delete", isAuthenticated, isAdmin, async (req, res) => {
    if (req.body.club_id == "") {
        res.redirect("/admin");
    }
    // simple casting doesn't allow us to access the methods in admin as it is just a JSON object currently
    // we construct a new admin object from the user
    const admin = new Admin(req.user as UserDB);
    const response = await admin.deleteClub(req.body.club_id);
    if (!response.success) {
        res.redirect(`/admin?error=${encodeURIComponent(response.error)}`);
    } else {
        res.redirect("/admin");
    }
});

adminRouter.post("/club/edit", isAuthenticated, isAdmin, async (req, res) => {
    // simple casting doesn't allow us to access the methods in admin as it is just a JSON object currently
    // we construct a new admin object from the user
    const admin = new Admin(req.user as UserDB);
    const response = await admin.updateClub(req.body.club_id, req.body.label, req.body.description);
    if (!response.success) {
        res.redirect(`/admin?error=${encodeURIComponent(response.error)}`);
    } else {
        res.redirect("/admin");
    }
});

adminRouter.post("/school/add", isAuthenticated, isAdmin, async (req, res) => {
    // simple casting doesn't allow us to access the methods in admin as it is just a JSON object currently
    // we construct a new admin object from the user
    const admin = new Admin(req.user as UserDB);
    const response = await admin.createSchool(req.body.name, req.body.description);
    if (!response.success) {
        res.redirect(`/admin?error=${encodeURIComponent(response.error)}`);
    } else {
        res.redirect("/admin");
    }
});

adminRouter.post("/school/delete", isAuthenticated, isAdmin, async (req, res) => {
    if (req.body.school_id == "") {
        res.redirect("/admin");
    }
    // simple casting doesn't allow us to access the methods in admin as it is just a JSON object currently
    // we construct a new admin object from the user
    const admin = new Admin(req.user as UserDB);
    const response = await admin.deleteSchool(req.body.school_id);
    if (!response.success) {
        res.redirect(`/admin?error=${encodeURIComponent(response.error)}`);
    } else {
        res.redirect("/admin");
    }
});

adminRouter.post("/school/edit", isAuthenticated, isAdmin, async (req, res) => {
    // simple casting doesn't allow us to access the methods in admin as it is just a JSON object currently
    // we construct a new admin object from the user
    const admin = new Admin(req.user as UserDB);
    const response = await admin.updateClub(req.body.school_id, req.body.name, req.body.description);
    if (!response.success) {
        res.redirect(`/admin?error=${encodeURIComponent(response.error)}`);
    } else {
        res.redirect("/admin");
    }
});