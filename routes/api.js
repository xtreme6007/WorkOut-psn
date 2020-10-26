const router = require("express").Router();
const Workout = require("../models/workout.js");
var path = require("path");

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params}, res) => {
    Workout.findByIdAndUpdate(params.id, { $push: { exercise: body } }, { new: true, runValidators: true })
      .then(workout => {
        res.json(workout);
      }).catch(err => {
        console.log(err)
        res.status(400).json(err);
      });
  });

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/", function (req,res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", function (req,res) {

    res.sendFile(path.join(__dirname, "../public/exercise.html"));

});

router.get("/stats", function (req,res) {

    res.sendFile(path.join(__dirname, "../public/stats.html"));

});

module.exports = router;