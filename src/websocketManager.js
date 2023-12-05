let ws;

export const connectWebsocket = (url) => {
  if (!url) {
    console.error('WebSocket URL is required');
    return;
  }

  ws = new WebSocket(url);

  const onOpenPromise = new Promise((resolve) => {
    ws.onopen = () => {
      console.log('Connected to the WebSocketServer at url: ' + url);
      console.log('ws: ', ws);

      const message = {
        type: 'debug',
        msg: 'ws-sqlite is connected to WebSocket',
      };
      ws.send(JSON.stringify(message));

      resolve(ws);
    };
  });

  return onOpenPromise;
};

// let ws;

// export const connectWebsocket = (url) => {
//   if (!url) {
//     console.error('WebSocket URL is required');
//     return;
//   }

//   ws = new WebSocket(url);

//   ws.onopen = () => {
//     console.log('Connected to the WebSocketServer at url: ' + url);
//     console.log('ws: ', ws);

//     const message = {
//       type: 'debug',
//       msg: 'ws-sqlite is connected to WebSocket',
//     };
//     ws.send(JSON.stringify(message));
//   };
// };
