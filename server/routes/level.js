var express = require('express');
var router = express.Router();
var Lesson = require('../model/lesson');

router.get('/:level', function (req, res, next) {
  Lesson.find({
    level: req.params.level
  }).then(data => {
    console.log(data);
    res.json(data)
  })
    .catch(err => res.status(404).json({message: "No lesson found"}))
});

module.exports = router;
