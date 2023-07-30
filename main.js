let sendArea = document.querySelector('#sendArea');
let typeArea = document.querySelector('#typeArea');
function send() {
    if(typeArea.value === '') return
    textCreate(typeArea.value)
    typeArea.value = '';
}

function textCreate(message) {
    let roomBodyText = document.querySelector('.roomBodyText')
    let div = document.createElement('div');
    let p = document.createElement('p');
    div.className = 'textBox mine';
    p.className = 'words mine';
    p.innerText = message;
    div.appendChild(p);
    roomBodyText.appendChild(div);
}
typeArea.addEventListener('keydown',(event) => {
    if(event.key !== 'Enter') return 
    send();
});