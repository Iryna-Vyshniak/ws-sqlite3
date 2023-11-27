let ws;

const connectWebsocket = (url) => {
  if (!url) {
    console.error('WebSocket URL is required');
    return;
  }

  ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('Connected to the WebSocketServer at url: ' + url);
  };
};
