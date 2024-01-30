import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import GlobalStates from './shared/context/global.states.context.jsx';

import './stylesheet/index.css';

// Websocket
const serverAddress = 'wss://simple-websocket-sqlite3.glitch.me/';
const ws = new WebSocket(serverAddress);

ws.onopen = () => {
  console.log('Connected to the WebSocketServer at url: ' + ws.url);

  const message = {
    type: 'debug',
    msg: 'ws-sqlite is connected to WebSocket',
  };
  ws.send(JSON.stringify(message));
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStates ws={ws}>
      <App />
    </GlobalStates>
  </React.StrictMode>
);
