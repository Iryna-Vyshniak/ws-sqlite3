import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './stylesheet/index.css';
// import { connectWebsocket } from './websocketManager.js';
import GlobalStates from './shared/context/global.states.context.jsx';

// Websocket
const ws = new WebSocket('ws://localhost:5000');

ws.onopen = () => {
  console.log('Connected to the WebSocketServer at url: ' + ws.url);
  console.log('ws: ', ws);

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

// connectWebsocket('ws://localhost:5000')
//   .then((ws) => {
//     ReactDOM.createRoot(document.getElementById('root')).render(
//       <React.StrictMode>
//         <GlobalStates ws={ws}>
//           <App />
//         </GlobalStates>
//       </React.StrictMode>
//     );
//   })
//   .catch((error) => {
//     console.error('Error connecting to WebSocket:', error);
//   });
