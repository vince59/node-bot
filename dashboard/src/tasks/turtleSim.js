const readline = require('readline');
const WebSocket = require('ws');

const engine = (!process.argv[2]) ? "ws://localhost:8080" : process.argv[2];
console.log(`Connect to engine on ${engine}`);
const ws = new WebSocket(engine);

ws.onerror = function (error) {
    console.log(error.message);
};

ws.on('open', function open() {
    let x = 0;
    let y = 0;

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            process.exit();
        } else {
            switch (key.name) {
                case 'up': y++; break;
                case 'down': y--; break;
                case 'letft': x--; break;
                case 'right': x++; break;
            }
            const data = { x: x, y: y };
            const msg = { action: 'send', topic: 'target', message: data };
            ws.send(JSON.stringify(msg));
        }
    });
});

