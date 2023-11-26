// Database MySQL
const mysql2 = require('mysql2');
let dbmysql = null;

function openMysql(name) {
  dbmysql = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: name,
  });
  dbmysql.connect((err) => {
    if (err) {
      console.error('error mysql: ' + err.stack);
      return;
    }
    console.log('db is mysql is open');
  });
  return dbmysql;
}

const sqlite3 = require('sqlite3').verbose();
let db = null;

function open(name) {
  db = new sqlite3.Database('../build/' + name + '.sqlite', (err) => {
    if (err) console.error(err.message);
    else console.log("Database '" + name + "' is open!");
  });

  return db;
}

function close() {
  db.close();
}
