import mysql2 from 'mysql2';
import sqlite3 from 'sqlite3';

let dbmysql = null;

function openMysql(name) {
  dbmysql = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '777',
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

const sql = sqlite3.verbose();
// console.log('sql: ', sql);
let db = null;

function open(name) {
  db = new sql.Database('server/' + name + '.db', (err) => {
    if (err) console.error(err.message);
    else console.log("Database '" + name + "' is open!");
  });

  return db;
}

function close() {
  db.close();
}

function control(ws) {
  ws.on('message', function (message) {
    try {
      const { type, data } = JSON.parse(message);

      if (type === 'insert') insert(data.tableName, data.placeholders, data.values);
      else if (type === 'update')
        update(data.tableName, data.placeholders, data.values, data.where);
      else if (type === 'select') {
        select(data.tableName, data.placeholders, data.where).then((rows) => {
          ws.send(
            JSON.stringify({
              type: 'databaseSelectChanged',
              tableName: data.tableName,
              value: rows,
            })
          );
        });
      } else if (type === 'selectAll') {
        const sql = data.where ? ` WHERE ${data.where}` : '';
        db.all('SELECT * FROM ' + data.tableName + sql, (err, rows) => {
          if (err) {
            console.error(err);
            return;
          }
          ws.send(
            JSON.stringify({
              type: 'databaseSelectAllChanged',
              tableName: data.tableName,
              value: rows,
            })
          );
        });
      } else if (type === 'selectAllTwo') {
        db.all('SELECT * FROM ' + data.tableName, (err, rows) => {
          if (err) {
            console.error(err);
            return;
          }
          ws.send(
            JSON.stringify({
              type: 'databaseSelectAllTwoChanged',
              tableName: data.tableName,
              value: rows,
            })
          );
        });
      } else if (type === 'selectAllunit') {
        db.all('SELECT * FROM ' + data.tableName, (err, rows) => {
          if (err) {
            console.error(err);
            return;
          }
          ws.send(
            JSON.stringify({
              type: 'databaseSelectAllunitChanged',
              tableName: data.tableName,
              value: rows,
            })
          );
        });
      } else if (type === 'selectSorted') {
        select(
          data.tableName,
          data.placeholders,
          data.where,
          data.orderBy,
          data.orderDirection
        ).then((rows) => {
          ws.send(
            JSON.stringify({
              type: 'databaseSelectSortedChanged',
              tableName: data.tableName,
              value: rows,
            })
          );
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
}

export { open, close, openMysql, control };
