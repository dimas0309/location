if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mapBoxToken = process.env.MAPBOX_TOKEN
const port = process.env.PORT || 8081

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('locations/home');    
})

app.post('/', (req, res) => {

    res.send(req.body);
})

app.listen(port, () => {
	console.log(`APP IS LISTENING ON PORT ${port}!`);
})    