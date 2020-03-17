let express = require("express");
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

router.post("/api/burgers", function(req, res) {
    // execute insertOne function in burger.js
    burger.insertOne([
        // column names from mysql table
        "burger_name"
    ], [
        // .name and .devoured come from the front end (on cat.js file, there is a 
        // var newBurger that has properties name: and devoured:; those need to equal each other!)
        req.body.burger_name
    ], function(result) {
        res.json({ id: result.insertId })
    })
})

router.put("api/burgers/:id", function(req,res) {
    let condition = "id = " + req.params.id;

    console.log("condition:", condition);
    console.log("req.body.devoured: ",req.body.devoured)

    burger.updateOne({
        devoured: req.body.devoured

    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
            
    })
});


module.exports = router;