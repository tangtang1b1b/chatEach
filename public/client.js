// 創建 Socket.io 連接
const socket = io();
let sendArea = document.querySelector('#sendArea');
let typeArea = document.querySelector('#typeArea');

function send() {
    if(typeArea.value === '') return;
    let roomBody = document.querySelector('.roomBody');
    let message = typeArea.value;
    textCreate(message, true);
    roomBody.scrollTop = roomBody.scrollHeight;
    socket.emit('message', message); // 發送訊息到 Socket.io 伺服器
}

function textCreate(message, isMine) {
    let roomBodyText = document.querySelector('.roomBodyText');
    let div = document.createElement('div');
    let p = document.createElement('p');
    // let pName = document.createElement('p');
    if(isMine){
        div.className = 'textBox mine';
        p.className = 'words mine';
    } else {
        div.className = 'textBox';
        p.className = 'words';
        // pName.className = 'userName';
        // pName.textContent = `${senderId}:`;
    }
    p.innerText = message;
    div.appendChild(p);
    // div.appendChild(pName);
    roomBodyText.appendChild(div);
    typeArea.value = '';
}

typeArea.addEventListener('keydown', (event) => {
    if(event.key !== 'Enter') return;
    send();
});
sendArea.addEventListener('click',() => {
  send();
});

// 監聽 'message' 事件
socket.on('message', (message) => {
    // console.log('收到訊息：', data);
    if (message !== typeArea.value) {
      textCreate(message, false);
      typeArea.value = '';
    }
});
