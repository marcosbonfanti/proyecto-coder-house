const socket = io.connect();
let submitChat = document.getElementById('form-Chat');

socket.emit('askMessages');

socket.on('updateChat', (messages) => {
    messages.forEach((message) => {
      renderChat(message);
    });
});

submitChat.addEventListener('submit', (e) => {
    let form = submitChat.getElementsByTagName('input');
    let inputTxt = document.getElementById('text');
    let inputs = new Object();
    e.preventDefault();
  
    for (let index = 0; index < form.length; index++) {
      inputs[form[index].name] = form[index].value;
    }
    socket.emit('new-message', inputs);
    inputTxt.value = '';
  });

renderChat = (data) => {
    let chatUl = document.getElementById('messages');
    let newElement = document.createElement('li');
    newElement.className = 'message left appeared';
    let htmlMessage = `
    <div class="avatar"></div>
    <div class="text_wrapper">
        <span class="email">${data.email}</span>
        <span class="date"> [ ${data.date} ]: </span>
        <span class="text">${data.text}</span>
    </div>`;
    newElement.innerHTML = htmlMessage;
    chatUl.appendChild(newElement);
    chatUl.scrollTo(0, document.body.scrollHeight);
};
  