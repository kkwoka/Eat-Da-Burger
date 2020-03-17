var connection = require("../config/connection");

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection


function printQuestionMarks(num) {//maps values 
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Tavern Burger => 'Tavern Burger')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
      
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  

let orm = {
    selectAll: function(tableName, cb) {
        let queryString = "Select * from ??";
        connection.query(queryString, [tableName], function (err, results) {
            if (err) throw err;
            cb(results);
        });
    },
    insertOne: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();//must align to values being inserted into mysql database
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    // An example of objColVals would be {name: Tavern Burger, devour: true}
    updateOne: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals); 
      queryString += " WHERE ";
      queryString += condition; //Ex. (id = 1)
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result); //call back 
      });
    }
};













// var orm = {
    // selectAll: function(tableName, cb) {
    //     let queryString = "Select * from ??";
    //     connection.query(queryString, [tableName], function (err, results) {
    //         if (err) throw err;
    //         cb(results);
    //     });
    // },
    // insertOne: function(tableName, burger_name, burger_val, cb) {
    //     let queryString = "Insert into ?? () value ()";
    //     connection.query(queryString, [tableName, burger_name, burger_val], function (err, results) {
    //         if (err) throw err;
    //         cb(results);
    //     });
    // },
//     updateOne: function(tableName, columnName1, boolean1, columnName2, boolean2, cb) {
//         let queryString = "Update ?? Set ? = ? Where ? = ?";
//         connection.query(queryString, [tableName, columnName1, boolean1, columnName2, boolean2], function (err, results) {
//             if (err) throw err;
//             cb(results);
//         });
//     }
// };

module.exports = orm;