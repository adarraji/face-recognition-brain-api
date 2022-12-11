const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require('knex');
const bcrypt = require("bcrypt-nodejs");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.PG_DATABASE_URL,
        ssl: true
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("it is working!"));

app.post("/signin", (req, res) => signin.handleSignIn(req, res, db, bcrypt));
app.post("/register", (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, db));
app.put("/image", (req, res) => image.handleImage(req, res, db));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));


app.listen(process.env.PORT || "3000", () => {
    console.log(`app is running on port ${process.env.PORT}`);
});