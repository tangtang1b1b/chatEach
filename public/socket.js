// socket.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


// 設置靜態檔案路徑，將包含 socket.js 的資料夾設為靜態路徑
app.use(express.static(__dirname));

// 監聽連接請求
io.on('connection', (socket) => {
  let userName;
  socket.on('join', (username) => {
    userName = username;
    console.log(`User ${userName} joined`);
    
  });
  // 監聽 'message' 事件
  socket.on('message', (data) => {
    console.log(`收到${userName}訊息：`, data);

    // 發送訊息給除了發送者之外的所有客戶端
    socket.broadcast.emit('message', {
      name: userName,
      message: data,
    })
  });
});

// 啟動伺服器
const port = 3000;
server.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`);
});
