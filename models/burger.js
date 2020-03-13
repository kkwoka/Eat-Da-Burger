let orm = require("../config/orm");

let burg = {
    selectAll: function (cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    insertOne: function (cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function(res) {
            CSS(res);
        });
    },
    updateOne: function(tableName, columnName1, boolean1, columnName2, boolean2, cb) {
        orm.updateOne("burgers", tableName, columnName1, boolean1, columnName2, boolean2, function(res) {
            cb(res);
        });
    }
};

module.exports = burg;


// tableName, burger_name, burger_val
// orm.insertOne("burgers", "Kid's");

// tableName, columnName1, boolean1, columnName2, boolean2
// orm.updateOne("burgers", "devoured", "true", "id", "false");

