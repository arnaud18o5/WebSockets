'use strict';

const socket = io();
const channel = 'chat message';
const changeRoom = 'change room';

document.getElementById('room-select').addEventListener('submit', (event) => {
    event.preventDefault();
    const roomName = document.getElementById('rooms');
    socket.emit(changeRoom, roomName.value);
})

document.getElementById('message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  console.log("clique envoyer message")
  const inp = document.getElementById('m');
  const username = document.getElementById('username');
  const room = document.getElementById('rooms');
  console.log(room.value);
  if(room.value === ''){
      console.log('cest bien ca')
  }
  socket.emit(channel, username.value+ ' : ' + inp.value , room.value);
  inp.value = '';
});


socket.on(channel, (msg) => {
  const item = document.createElement('li');
  item.innerHTML = msg;
  const list = document.getElementById('chat');
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
});
