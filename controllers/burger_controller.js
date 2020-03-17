let express = require("express");

// import the model (burger.js) to use its databse functions.
let burger = require("../models/burger.js");

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

router.post("/api/burgers", function(req, res) {
    // execute insertOne function in burger.js
    burger.insertOne([
        // column names from mysql table
        "burger_name", "devoured"
    ], [
        // .name and .sleepy come from the front end (on cat.js file, there is a 
        // var newCat that has properties name: and sleepy:; those need to equal each other!)
        req.body.name, req.body.sleepy
    ], function(result) {
        res.json({})
    })
})

router.put("api/burgers/:id", function(req,res) {
    let condition = "id = " + req.params.id;

    console.log("condition:", condition);

    burger.updateOne({
        
    })
})




module.exports = router;