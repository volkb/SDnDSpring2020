import express from "express";
import https from "https";
import {readFileSync} from "fs";
import passport from "passport";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {authenticate} from "passport";
import session from "express-session";
import {configurePassport, isAuthenticated} from "./config/passport";

dotenv.config();

const PORT = 8080;
const app = express();
configurePassport(passport);
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 3 * 24 * 60 * 60 * 1000}
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Hello world :)! Woof Woof");
});

app.get("/login", (req, res) => {
    res.send("Login page here!");
});

app.get("/auth/facebook", authenticate("facebook", { scope: ["email", "public_profile"] }));

app.get("/auth/facebook/callback", authenticate("facebook", {
    successRedirect: "/secured_login",
    failureRedirect: "/login"
}));
app.get("/secured_route", isAuthenticated, (req, res) => {
    console.log(req.user);
    res.send("You're logged in!");
});

https.createServer({
    key: readFileSync("./key.pem"),
    cert: readFileSync("./cert.pem"),
    passphrase: process.env.SSL_CERT_PASSPHRASE
}, app).listen(PORT, () => {
    console.log("Bloodhound has begun sniffing");
});