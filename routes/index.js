var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@localhost:32781/admin', { useNewUrlParser: true });

var carSchema = new mongoose.Schema({
  name: String,
  carId: Number,
});

var Cars = mongoose.model('CarsList', carSchema);

let count = 0;

/* GET home page. */
router.get('/', function (req, res, next) {
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
  console.log(req.body.name);

  var silence = new Cars({ name: req.body.name });
  silence.save((error, el) => {
    res.render('saveSuccess', { name: req.body.name, title: 'Saved!' });
  });
});

module.exports = router;
