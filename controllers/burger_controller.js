let express = require("express");
let burger = require("../models/burger");
let router = express.Router();

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers/", function(req, res) {
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(result) {
        res.json({ id: result.insertId })
    })
})

router.put("/api/burgers/:id", function(req,res) {
    let condition = "id = " + req.params.id;

    console.log("condition:", condition);
    console.log("req.body.devoured: ",req.body.devoured)

    burger.updateOne({
        devoured: true

    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
            
    })
});


module.exports = router;