import express from "express";
import https from "https";
import {readFileSync} from "fs";
import passport from "passport";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {authenticate} from "passport";
import session from "express-session";
import path from "path";
import {configurePassport, isAuthenticated} from "./config/passport";
import {DatabaseManager} from "./models/DatabaseManager";
import {User} from "./models/UserAPI";
import { profileRouter } from "./profile";
import { searchRouter } from "./search";
import { adminRouter } from "./admin";

dotenv.config();

const PORT = 8080;
const app = express();
// Singleton design pattern, we only want one here
export const DBManager = new DatabaseManager();
configurePassport(passport);
// Establishes a persistent session via a cookie which lasts 3 days
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 3 * 24 * 60 * 60 * 1000}
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// ROUTERS
app.use("/profile", profileRouter);
app.use("/search", searchRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
    if(req.isAuthenticated())
    {
        res.redirect("/dashboard"); // If user is already logged in send them to the dashboard
    }
    else
    {
        res.sendFile(path.join(__dirname, "/views/index.html"));
    }
});

// Requests email and the public profile from facebook
app.get("/auth/facebook", authenticate("facebook", { scope: ["email", "public_profile"] }));

// If you successfully login then you get redirected to the secure route, else back to the login screen
app.get("/auth/facebook/callback", authenticate("facebook", {
    successRedirect: "/dashboard",
    failureRedirect: "/"
}));

app.get("/auth/logout", isAuthenticated, (req, res) => {
    req.logout();
    res.redirect("/");
});

app.get("/edit_profile", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname + "/views/edit_profile.html"));
});

app.get("/privacy_policy", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/privacy_policy.html"));
});

app.get("/dashboard", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "/views/dashboard.html"));
});

app.get("/create_account", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/create_account.html"));
});

app.get("/user", isAuthenticated, async (req, res) => {
    const token = req.query.token;
    const user = await User.find(token);
    res.send(user);
});


/*
 Creates the https server sadly this means you need to use https:// 
 as node itself doesn't support reverse proxying (if you're not using port 80 and 443) as this is normally reserved for
 running behind a web server such as NGINX
*/
https.createServer({
    key: readFileSync("./key.pem"),
    cert: readFileSync("./cert.pem"),
    passphrase: process.env.SSL_CERT_PASSPHRASE
}, app).listen(PORT, () => {
    console.log("Bloodhound has begun sniffing");
});

app.use(express.static("src/public"));
app.use("/profile_pictures", express.static(path.join(__dirname, "../data/pictures")));