const WebSocket = require('ws');
const engine = (!process.argv[2])?"ws://localhost:8080":process.argv[2];
console.log(`Connect to engine on ${engine}`);
const ws = new WebSocket(engine);

ws.onerror = function (error) {
  console.log(error.message);
};

let i = 0;
setInterval(() => {
  const data = {from: 'testLog2', msg : `message ${i++}`};
  const msg={action: 'send', topic: 'log', message: data};
  ws.send(JSON.stringify(msg));
}, 500)