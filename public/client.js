// 創建 Socket.io 連接
const socket = io();
let sendArea = document.querySelector('#sendArea');
let typeArea = document.querySelector('#typeArea');
let userNameSend = document.querySelector('#userNameSend');
let usernameInput = document.querySelector('#usernameInput');
let joinButton = document.querySelector('#joinButton');
let minener = false;

joinButton.addEventListener('click', () => {
    const username = usernameInput.value;
    if (username !== '') {
        userNameSend.style.opacity = '0';
        setTimeout(() => {
            userNameSend.remove();
        }, 300);
        socket.emit('join', username);
    }
});

function send() {
    if(typeArea.value === '') return;
    let roomBody = document.querySelector('.roomBody');
    let message = typeArea.value;
    textCreate(message, true);
    roomBody.scrollTop = roomBody.scrollHeight;
    socket.emit('message', message); // 發送訊息到 Socket.io 伺服器
}

function textCreate(message, isMine, userName) {
    const clock = new Date();
    const Hours = clock.getHours() > 12 ? clock.getHours() % 12 : clock.getHours();
    const Ampm = clock.getHours() > 12 ? '下午' : '上午';
    const Minutes = clock.getMinutes().toString().padStart(2,'0');
    let roomBodyText = document.querySelector('.roomBodyText');
    let div = document.createElement('div');
    let p = document.createElement('p');
    let pTime = document.createElement('p');
    let pName = document.createElement('p');
    if(isMine){
        div.className = 'textBox mine';
        p.className = 'words mine';
        pTime.className = 'currentTime mine';
        pTime.textContent = `${Ampm} ${Hours}:${Minutes}`;
    } else {
        div.className = 'textBox';
        p.className = 'words';
        pName.className = 'userName';
        pTime.className = 'currentTime';
        pName.textContent = `${userName}`;
        pTime.textContent = `${Ampm} ${Hours}:${Minutes}`;
    }
    p.innerText = message;
    div.appendChild(p);
    div.appendChild(pName);
    div.appendChild(pTime);
    roomBodyText.appendChild(div);
    if(message === typeArea.value){
        minener = typeArea.value;
        typeArea.value = '';
    }
}

let updatetext = true;
let endtext = false;
typeArea.addEventListener('compositionupdate',() => {
    updatetext = true;
    endtext = false;
    // console.log('輸入中');
})
typeArea.addEventListener('compositionend',() => {
    updatetext = false;
    endtext = true;
    // console.log('好');
})
typeArea.addEventListener('keydown', (event) => {
    if(event.key !== 'Enter' || !endtext || updatetext) return;
    send();
});
sendArea.addEventListener('click',() => {
    send();
});
    
// 監聽 'message' 事件
socket.on('message', (data) => {
    console.log('收到訊息：', data);
    let roomBody = document.querySelector('.roomBody');
    if (data.message !== minener) {
        textCreate(data.message, false, data.name);
        roomBody.scrollTop = roomBody.scrollHeight;
    }
});
