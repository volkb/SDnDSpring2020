import express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";

// Load Environment Variables
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello world :)!");
});

app.listen(PORT, () => console.log("Bloodhound has begun sniffing!"));