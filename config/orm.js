var connection = require("../config/connection");

function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }
  
  function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
      
        arr.push(key + "=" + value);
      }
    }
  
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
      queryString += cols.toString();
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

    updateOne: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals); 
      queryString += " WHERE ";
      queryString += condition; 
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
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