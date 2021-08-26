console.log('ME ESTOY EJECUTANDO');

const socket = io.connect();
let submitChat = document.getElementById('form-Chat');


socket.emit('askProducts');
socket.emit('askMessages');

socket.on('products', function (data) {
  render(data)
});

socket.on('updateChat', (messages) => {
  messages.forEach((message) => {
    renderChat(message);
  });
});

function sendData(e) {
  const input = document.getElementById('MyForm');
  const formData = {
      title: input.title.value,
      precio: input.precio.value,
      thumbnail: input.thumbnail.value
  }
  console.log(formData);
  socket.emit('new-product', formData);
}

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

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `<tr>
              <td>${elem.title}</td>
              <td>${elem.precio}</td>
              <td><img style="width: 100px" src="${elem.thumbnail}"></img></td>
          </tr>`;
    })
    .join(' ');

  document.getElementById('miTabla').innerHTML = html;
}

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
