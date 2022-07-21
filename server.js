const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require('knex');
const { response } = require("express");
const bcrypt = require("bcrypt-nodejs");

require('dotenv').config();


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'smart-brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {

});

app.post("/signin", (req, res) => {
    db.select("email", "hash").from("login")
        .where("email", "=", req.body.email)
        .then(data => {
            const isvalid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isvalid) {
                return db.select("*").from("users").where("email", "=", req.body.email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json("unable to get user"));
            } else {
                res.status(400).json("wrong credentials");
            }

        })
        .catch(err => res.status(400).json("wrong credentials"));
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into("login")
            .returning("email")
            .then(loginEmail => {
                trx("users").returning("*").insert({
                    name: name,
                    email: loginEmail[0].email,
                    joined: new Date()
                })
                    .then(user => res.json(user[0]))
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).catch(err => res.status(400).json("unable to register"));
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    db.select("*").from("users").where({ id }).then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json("Not found");
        }
    }).catch(err => res.status(400).json("Error getting user"));
});

app.put("/image", (req, res) => {
    const { id } = req.body;
    db("users")
        .where("id", '=', id)
        .increment("entries", 1)
        .returning("entries")
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json("Error getting entries"));;
});


app.listen("3000", () => {
    console.log("app is running on port 3000");
});