// Routing
/* 

import express from 'express';
import request from 'request';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

*/

const express = require('express');
const request = require('request');
const path = require('path');
const cors = require('cors');
const { createServer } = require('http');
const { WebSocketServer, WebSocket } = require('ws');

const app = express();

app.use(cors({ origin: '*' }));

// Server
const server = createServer(app);
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

// WebSocket
const wss = new WebSocketServer({ server });

// Database
const dbManager = require('./db');
let db = dbManager.open('conf');
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, theme TEXT, lang TEXT)'
  );
});

const tableCheckQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='projects';`;
const createTableQuery = `CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name VARCHAR(255) NOT NULL, 
  orgname VARCHAR(255) NOT NULL);`;

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
          // Table already created
          console.log('Table already created');
        } else {
          // Table just created, creating some rows
          const insert = 'INSERT INTO projects (name, orgname) VALUES (?,?)';
          db.run(insert, ['Sophia Garcia', 'RST Group']);
          db.run(insert, ['Daniel Martinez', 'UVW Corporation']);
          db.run(insert, ['Olivia Rodriguez', 'HIJ Enterprises']);
          db.run(insert, ['Alexander Nguyen', 'MNO Inc.']);
        }
      });
      console.log('Projects table is successfully created.');
    } else {
      console.log('Projects table didn`t create');
    }
  });
});

// Account
const accManager = require('./account_manager');
accManager.setDatabase(db);

wss.on('connection', (ws) => {
  console.log('connecting to  WebSocket');

  accManager.control(ws);
  dbManager.control(ws);

  //    contactManager.control(ws);
  //    updateManager.control(ws);

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
server.listen(PORT, function () {
  console.log('Proxe Server v0.1.0 starting...');
  console.log('Proxe Server v0.1.0 listening at port %d', PORT);
});
