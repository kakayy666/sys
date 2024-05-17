const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const utf8 = require('utf8');
const SSHClient = require('ssh2').Client;
const serverHandler = require('../app')
const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: true });

function createNewServer(machineConfig, socket) {
  const ssh = new SSHClient();
  const { msgId, CVEid } = machineConfig;
  console.log("CVEid", machineConfig);
  ssh.on('ready', function () {
    socket.emit(msgId, '\r\n*** ' + ' SSH CONNECTION ESTABLISHED ***\r\n');
    
    ssh.shell({ cols: machineConfig.cols, rows: machineConfig.rows }, function (err, stream) {
      if (err) {
        return socket.emit(msgId, '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
      }
      // 要执行的命令数组
      const commands = [
        'cd S2VulnHub',
        `bash test.sh ${CVEid}`,
        'clear'
      ];

      // 逐个执行命令
      commands.forEach(command => {
        stream.write(command + '\n'); // 在流中写入命令
      });
      socket.on(msgId, function (data) {  
        stream.write(data);
      });

      stream.on('data', function (d) {
        socket.emit(msgId, utf8.decode(d.toString('binary')));
      }).on('close', function () {
        ssh.end();
      });

      socket.on('resize', function (data) {
        stream.setWindow(data.rows, data.cols);
      });
    });
  }).on('close', function () {
    socket.emit(msgId, '\r\n*** SSH CONNECTION CLOSED ***\r\n');
  }).on('error', function (err) {
    console.log(err);
    socket.emit(msgId, '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
  }).connect({
    host: '47.100.180.85',
    port: 22, 
    username: 'root',
    password: 'Admin123456'
  });
}

io.on('connection', function (socket) {
  socket.on('createNewServer', function (machineConfig) {
    console.log("createNewServer");
    createNewServer(machineConfig, socket);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  }); 
});
app.use(serverHandler)
const PORT = process.env.PORT || 3000; 
server.listen(PORT, function () {
  console.log('listening on *:' + PORT);
});
