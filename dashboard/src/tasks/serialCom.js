const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0', {
    baudRate: 9600
});

const BUZ = "BUZ";
const GYR = "GYR";

port.on('readable', function () {
    data=port.read().toString();
    console.log('read :',data);
    
    port.write(BUZ+"\n", function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log("write",BUZ);
    }); 
});

