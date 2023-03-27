
var socket = io();

var messages = document.getElementById('container');
var form = document.getElementById('send-container');
var input = document.getElementById('messageInp');
let name = prompt("Enter Your Name :");
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var item = document.createElement('div');
    item.innerText = `You: ${input.value} `;
    item.classList.add("message");
    item.classList.add("right");
    item.classList.add("mr-3");
    window.scrollTo(0, document.body.scrollHeight);

    messages.appendChild(item);
    if (input.value) {
        socket.emit('chat message', name, input.value);
        input.value = '';
    }
});


socket.emit('new-user-joined', name);

socket.on('new-user-joined', (nm) => {
    var item = document.createElement('div');
    item.innerText = nm + " joined the chat";
    item.classList.add("message");
    item.classList.add("middle");

    item.classList.add("mr-3");

    window.scrollTo(0, document.body.scrollHeight);

    messages.appendChild(item);
});

socket.on('user-left', (nm) => {
    var item = document.createElement('div');
    item.innerText = nm + " left the chat";
    item.classList.add("message");
    item.classList.add("middle");

    item.classList.add("mr-3");

    window.scrollTo(0, document.body.scrollHeight);

    messages.appendChild(item);
});
// socket.on('user-disconnected',function(){
//     var item = document.createElement('div');
//   item.innerText="User disconnected";
//   item.classList.add("message");
//   item.classList.add("left");

//   messages.appendChild(item);

// })

socket.on('chat message', function (name, msg) {
    var item = document.createElement('div');
    item.innerText = name + ": " + msg;
    item.classList.add("message");
    item.classList.add("left");
    item.classList.add("mr-3");
    window.scrollTo(0, document.body.scrollHeight);

    messages.appendChild(item);
});

