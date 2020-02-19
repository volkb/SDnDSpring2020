import express from "express";
import * as bodyParser from "body-parser";

const PORT = 8080;
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello world :)! Woof Woof");
});

app.listen(PORT, () => console.log("Bloodhound has begun sniffing!"));