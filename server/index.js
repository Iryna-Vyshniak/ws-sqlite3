import express from 'express';
// import request from 'request';
// import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import * as accManager from './account_manager.js';
import * as dbManager from './db.js';
// console.log('dbManager: ', dbManager);

// Routing
const app = express();

app.use(cors({ origin: '*' }));

// Server
const server = createServer(app);

const PORT = 5000;

// WebSocket
const wss = new WebSocketServer({ server });

// Database
let db = dbManager.open('conf');
console.log('db: ', db);

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, theme TEXT, lang TEXT)'
  );
});

const tableCheckQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='projects';`;
const createTableQuery = `CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name VARCHAR(255) NOT NULL, 
  orgname VARCHAR(255) NOT NULL,
  slogan TEXT,
  datacreate DATE);`;

db.serialize(() => {
  db.all(tableCheckQuery, (err, rows) => {
    if (err) {
      console.error(err.message);
      throw err;
    }
    console.log('Length of rows is: ', rows.length);
    if (!rows.length) {
      // db.run(createTableQuery);
      db.run(createTableQuery, (err) => {
        if (err) {
          console.log('Table didn`t create');
        } else {
          // Table just created, creating some rows
          const insert =
            'INSERT INTO projects (name, orgname, slogan, datacreate) VALUES (?, ?, ?, ?)';
          db.run(insert, [
            'Sophia Garcia',
            'RST Group',
            'Connecting Dreams',
            new Date().toISOString().split('T')[0],
          ]);
          db.run(insert, [
            'Daniel Martinez',
            'UVW Corporation',
            'Innovate to Elevate',
            new Date().toISOString().split('T')[0],
          ]);
          db.run(insert, [
            'Olivia Rodriguez',
            'HIJ Enterprises',
            'Empowering Excellence',
            new Date().toISOString().split('T')[0],
          ]);
          db.run(insert, [
            'Alexander Nguyen',
            'MNO Inc.',
            'Inspiring Tomorrow',
            new Date().toISOString().split('T')[0],
          ]);
        }
      });
      console.log('Projects table is successfully created.');
    } else {
      console.log('Projects table already created');
    }
  });
});

// Account
// accManager.setDatabase(db);

wss.on('connection', (ws) => {
  console.log('connecting to  WebSocket');

  // accManager.control(ws);
  dbManager.control(ws);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'debug') console.log(data.msg);
    } catch (error) {
      console.error(error);
    }
  });

  ws.on('close', () => {
    console.log('Disconnect...');
  });
});

// Start server
server.listen(PORT, () => {
  console.log('Server listening at port: ', PORT);
});
