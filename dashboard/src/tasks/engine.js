const WebSocket = require('ws');
const wsPort = (!process.argv[2])?8080:process.argv[2];
const wss = new WebSocket.Server({ port: wsPort });
console.log(`Starting engine on ${wsPort}`);
let topic = {};

wss.on('connection', function connection(ws) {

  console.log('New connection');

  ws.on('message', function incoming(msg) {
    const mess = JSON.parse(msg)
    console.log(mess);
    if (!topic[mess.topic]) topic[mess.topic] = [];
    switch (mess.action) {
      case 'subscribe':
        topic[mess.topic].push(ws);
        break;
      case 'send':
        const message = { 'message': mess.message, 'topic': mess.topic };
        const txtMess = JSON.stringify(message)
        topic[mess.topic].forEach(client => {
          client.send(txtMess);
        });
        break;
    }
  });

});