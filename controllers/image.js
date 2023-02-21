const Clarifai = require("clarifai");
require('dotenv').config();

// Add your own API key here from Clarifai
const app = new Clarifai.App({
    apiKey: `${process.env.REACT_APP_API_KEY}`
});


// Clarifai.FACE_DETECT_MODEL sometimes gives errors so I'm using the id instead
const handleApiCall = (req, res) => {
    app.models.predict({
        id: "a403429f2ddf4b49b307e318f00e528b",
        version: "34ce21a40cc24b6b96ffee54aabff139",
    }, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("unable to work with API"));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users")
        .where("id", '=', id)
        .increment("entries", 1)
        .returning("entries")
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json("Error getting entries"));;
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}