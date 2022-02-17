if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8081;
const dbUrl = process.env.DB_RURL;
const mongoose = require('mongoose');
const db = mongoose.connection;
const Person = require('./models/person')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN
const geoCoder = mbxGeocoding({accessToken: mapBoxToken});
const session = require('express-session');
const flash = require('connect-flash');

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

db.on("error", console.error.bind(
    console, "Connection error:"));

db.once("open", () => {
    console.log("Database connected");
})    


const sessionOptions = {
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUnitialized: false
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
})

app.get('/', (req, res) => {
     

    res.render('locations/home');    
})

app.post('/', async(req, res) => {
    const location = req.body;
    const obj = [];

    obj.push(parseFloat(location.location.split(",")[0]))
    obj.push(parseFloat(location.location.split(",")[1]))

    const person = new Person();
    
    person.geometry.coordinates = obj

    await person.save();

    req.flash('success',`You marked this location: ${location.location}`);
    res.redirect('/');
})

app.listen(port, () => {
	console.log(`APP IS LISTENING ON PORT ${port}!`);
})    