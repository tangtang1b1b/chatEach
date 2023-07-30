let sendArea = document.querySelector('#sendArea');
function send() {
    let typeArea = document.querySelector('#typeArea');
    console.log(typeArea.value);
    typeArea.value = '';
}
sendArea.onclick = send;