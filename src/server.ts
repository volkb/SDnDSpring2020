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

dotenv.config();

const PORT = 8080;
const app = express();
configurePassport(passport);
// Establishes a persistent session via a cookie which lasts 3 days
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 3 * 24 * 60 * 60 * 1000}
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get("/login", (req, res) => {
    res.send("Login page here!");
});

// Requests email and the public profile from facebook
app.get("/auth/facebook", authenticate("facebook", { scope: ["email", "public_profile"] }));

// If you successfully login then you get redirected to the secure route, else back to the login screen
app.get("/auth/facebook/callback", authenticate("facebook", {
    successRedirect: "/secured_route",
    failureRedirect: "/login"
}));
app.get("/secured_route", isAuthenticated, (req, res) => {
    res.send("You're logged in!");
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

app.use("/", express.static(path.join(__dirname, "Flattern")));