import sqlite3 from 'sqlite3';
import insert from './controllers/insert.js';
import update from './controllers/update.js';

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
  // console.log('ws: ', ws);
  ws.on('message', (message) => {
    try {
      const { type, data } = JSON.parse(message);
      // console.log('type, data: ', type, data);

      switch (type) {
        case 'insert':
          insert(data.tableName, data.placeholders, data.values, db);
          break;
        case 'update':
          update(data.tableName, data.placeholders, data.values, data.where, db);
          break;
        case 'select':
          select(data.tableName, data.placeholders, data.where).then((rows) => {
            ws.send(
              JSON.stringify({
                type: 'databaseSelectChanged',
                tableName: data.tableName,
                value: rows,
              })
            );
          });
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
        case 'selectSorted':
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
          break;
      }
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  });
};

// function control(ws) {
//   ws.on('message', function (message) {
//     try {
//       const { type, data } = JSON.parse(message);
//       if (type === 'insert') insert(data.tableName, data.placeholders, data.values, db);
//       else if (type === 'update')
//         update(data.tableName, data.placeholders, data.values, data.where, db);
//       else if (type === 'select') {
//         select(data.tableName, data.placeholders, data.where).then((rows) => {
//           ws.send(
//             JSON.stringify({
//               type: 'databaseSelectChanged',
//               tableName: data.tableName,
//               value: rows,
//             })
//           );
//         });
//       } else if (type === 'selectAll') {
//         const query = data.where ? ` WHERE ${data.where}` : '';
//         db.all('SELECT * FROM ' + data.tableName + query, (err, rows) => {
//           if (err) {
//             console.error(err);
//             return;
//           }
//           ws.send(
//             JSON.stringify({
//               type: 'databaseSelectAllChanged',
//               tableName: data.tableName,
//               value: rows,
//             })
//           );
//         });
//       } else if (type === 'selectAllTwo') {
//         db.all('SELECT * FROM ' + data.tableName, (err, rows) => {
//           if (err) {
//             console.error(err);
//             return;
//           }
//           ws.send(
//             JSON.stringify({
//               type: 'databaseSelectAllTwoChanged',
//               tableName: data.tableName,
//               value: rows,
//             })
//           );
//         });
//       } else if (type === 'selectAllunit') {
//         db.all('SELECT * FROM ' + data.tableName, (err, rows) => {
//           if (err) {
//             console.error(err);
//             return;
//           }
//           ws.send(
//             JSON.stringify({
//               type: 'databaseSelectAllunitChanged',
//               tableName: data.tableName,
//               value: rows,
//             })
//           );
//         });
//       } else if (type === 'selectSorted') {
//         select(
//           data.tableName,
//           data.placeholders,
//           data.where,
//           data.orderBy,
//           data.orderDirection
//         ).then((rows) => {
//           ws.send(
//             JSON.stringify({
//               type: 'databaseSelectSortedChanged',
//               tableName: data.tableName,
//               value: rows,
//             })
//           );
//         });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   });
// }

export { open, close, control };
