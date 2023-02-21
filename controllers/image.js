const Clarifai = require("clarifai");
require('dotenv').config();

// Add your own API key here from Clarifai
const app = new Clarifai.App({
    apiKey: `${process.env.REACT_APP_API_KEY}`
});

const handleApiCall = (req, res) => {
    app.models.predict("53e1df302c079b3db8a0a36033ed2d15", req.body.input)  // Clarifai.FACE_DETECT_MODEL sometime gives errors so I'm using the id instead
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