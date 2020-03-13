var connection = require("../config/connection.js");

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
var orm = {
    selectAll: function(tableName) {
        let queryString = "Select * from ??";
        connection.query(queryString, [tableName], function (err, results) {
            if (err) throw err;
            console.log(results);
        });
    },
    insertOne: function(tableName, burger_name, burger_val) {
        let queryString = "Insert into ?? () value ()";
        connection.query(queryString, [tableName, burger_name, burger_val], function (err, results) {
            if (err) throw err;
            console.log(results);
        });
    },
    updateOne: function(tableName, columnName1, boolean1, columnName2, boolean2) {
        let queryString = "Update ?? Set ? = ? Where ? = ?";
        connection.query(queryString, [tableName, columnName1, boolean1, columnName2, boolean2], function (err, results) {
            if (err) throw err;
            console.log(results);
        });
    }
};

module.exports = orm;