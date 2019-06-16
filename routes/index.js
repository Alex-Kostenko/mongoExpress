var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
mongoose.connect('mongodb://admin:admin@localhost:27017/admin', { useNewUrlParser: true });
var app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

var carSchema = new mongoose.Schema({
  carId: Number,
  user: String,
  name: String,
  data: String,
});

var Cars = mongoose.model('CarsList', carSchema);

let count = 0;

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('test0');
  Cars.find({ name: /.+/ }, (error, cars) => {
    res.render('index', { title: 'Express', cars });
  });
});

router.get('/comments/:carId', function (req, res, next) {
  Cars.find({ name: new RegExp(req.params.carId) }, (error, car) => {
    res.json({ car });
  });
});

router.post('/', function (req, res, next) {

console.log('test1');

  var silence = new Cars({ name: req.body.name });
  silence.save((error, el) => {
    res.render('saveSuccess', { name: req.body.name, title: 'Saved!' });
  });
});

router.get('/test/:comment', function (req, res, next) {
  var toyota = new Cars({
    carId: 0,
    user: 'Toyota',
    name: req.params.comment,
  });

  toyota.save((error, el) => {
    res.json(toyota );
  });
});

router.post("/submit", urlencodedParser, function (req, res) {
  console.log(Cars);
  console.log('Add new car!!!');
  
  if (!req.body) return res.sendStatus(400);

  var newCar = new Cars({
    carId: req.body.id,
    user: req.body.userName,
    name: req.body.comment,
    data: req.body.data,
  });

  newCar.save((error, el) => {
    if (!req.body) return response.sendStatus(400);
    res.send(`${req.body.id} - ${req.body.userName} - ${req.body.comment} - ${req.body.data}`);
  });


});

router.get("/db", function (req, res) {
  console.log(CarsList);
  
  console.log(JSON.stringify(CarsList));
  // Card.find().pretify;
});

app.get("/submit", urlencodedParser, function (req, res) {
  res.render('index', { title: 'Express', cars });
  // res.sendFile(__dirname + "/");
});

module.exports = router;
