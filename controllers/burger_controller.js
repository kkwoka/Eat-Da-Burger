let express = require("express");

// import the model (burger.js) to use its databse functions.
let burger = require("../models/burger");

let router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});





module.exports = router;