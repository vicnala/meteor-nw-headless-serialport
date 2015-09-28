if (Meteor.isClient) {
  var SerialPort = require("serialport").SerialPort

  var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 1200
  });

  serialPort.on("open", function () {
    serialPort.on('data', function(data) {
      console.log('data received: ' + data);
    });

    serialPort.write("ABCDEFGHIJKLMNOPQRSTUVWXYZ", function(err, results) {
      if (err) console.log('err ' + err);
      console.log(results + ' bytes sent');
    });
  });
}
