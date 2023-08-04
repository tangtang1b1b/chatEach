// 創建 Socket.io 連接
const socket = io();
let sendArea = document.querySelector('#sendArea');
let typeArea = document.querySelector('#typeArea');

function send() {
    if(typeArea.value === '') return;
    let message = typeArea.value;
    textCreate(message, true);
    socket.emit('message', message); // 發送訊息到 Socket.io 伺服器
}

function textCreate(message, isMine) {
    let roomBodyText = document.querySelector('.roomBodyText');
    let div = document.createElement('div');
    let p = document.createElement('p');
    
    if(isMine){
        div.className = 'textBox mine';
        p.className = 'words mine';
    } else {
        div.className = 'textBox';
        p.className = 'words';
    }
    
    p.innerText = message;
    div.appendChild(p);
    roomBodyText.appendChild(div);
}

typeArea.addEventListener('keydown', (event) => {
    if(event.key !== 'Enter') return;
    send();
});

// 監聽 'message' 事件
socket.on('message', (data) => {
    // console.log('收到訊息：', data);
    console.log(data === typeArea.value);
    if (data !== typeArea.value) {
      textCreate(data, false);
      typeArea.value = '';
    }
});