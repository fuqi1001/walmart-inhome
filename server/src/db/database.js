const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, './walmart_inhome.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database');
})

// query util
db.query = function (sql, params) {
  const that = this;
  return new Promise((res, rej) => {
    that.all(sql, params, function(error, rows) {
      if (error) {
        rej(error);
      } else {
        res({ rows: rows });
      }
    })
  })
}

module.exports = db;