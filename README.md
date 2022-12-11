# Face Recognition Brain API

Backend application for [Face Recognition Brain](https://github.com/adarraji/face-recognition-brain).

It detects faces in images. It uses Clarifai API face detection model.


To run the application

1. Clone this repo
2. Run `npm install`
3. Run `npm start`

You must add your own API key in the `src/App.js` file to connect to Clarifai.

You can get Clarifai API key [here](https://www.clarifai.com/)


## Built With

* NodeJS 
* Postgres
* Knex 
* Clarifai API


## Environmental Variables

### Database URL

Add your PstgreSQL url `PG_DATABASE_URL` in the `index.js`

if you are using local postgres database you can use the following:

`PG_DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name}`
<br/>

## Deployment
Deployed on Heroku

## Authors

- **Ali Darraji** - [https://github.com/adarraji](https://github.com/adarraji)