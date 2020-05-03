const WebSocket = require('ws');
const engine = (!process.argv[2])?"ws://localhost:8080":process.argv[2];
console.log(`Connect to engine on ${engine}`);

const ws = new WebSocket(engine);

ws.onerror = function (error) {
  console.log(error.message);
};

ws.on('open', function open() {
  const msg={action: 'subscribe', topic: 'log'};
  ws.send(JSON.stringify(msg));
});

ws.on('message', function incoming(data) {
  console.log(data);
});
