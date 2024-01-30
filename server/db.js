import sqlite3 from 'sqlite3';
import insert from './controllers/insert.js';
import update from './controllers/update.js';
import deleteData from './controllers/delete.js';

const sql = sqlite3.verbose();
let db = null;

const open = (name) => {
  db = new sql.Database('server/' + name + '.sqlite', (err) => {
    if (err) console.error(err.message);
    else console.log("Database '" + name + "' is open!");
  });

  return db;
};

const close = () => {
  db.close();
};

const control = (ws) => {
  ws.on('message', (message) => {
    try {
      const { type, data } = JSON.parse(message);

      switch (type) {
        case 'insert':
          insert(data.tableName, data.placeholders, data.values, db);
          break;
        case 'update':
          update(data.tableName, data.placeholders, data.values, data.where, db);
          break;
        case 'delete':
          deleteData(data.tableName, data.where, db);
          break;

        case 'selectAll':
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
          break;
      }
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  });
};

export { open, close, control };
