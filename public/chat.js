'use strict';

const socket = io();
const channel = 'chat message';
const changeRoom = 'change room';



document.getElementById('room-select').addEventListener('submit', (event) => {
    const ID = document.querySelectorAll('*[id]');
    event.preventDefault();
    const roomName = document.getElementById('rooms');
    let test = 0;
    ID.forEach((e) => {
            console.log(e.id);
            if(e.id === roomName.value){
                test = 1;
                console.log(test);
            }
        })
    console.log(test);
    if(test === 0){
        socket.emit(changeRoom, roomName.value);
        const item = document.createElement('li');
        item.id = roomName.value;
        const button = document.createElement('button');
        button.innerHTML = roomName.value;
        button.onclick = () => {deleteRoom(button.innerHTML)};
        item.appendChild(button);
        const list = document.getElementById('rooms-list');
        list.appendChild(item);
        list.scrollTop = list.scrollHeight;
    }
    else{
        window.alert("You can't use this room");
    }
})

const deleteRoom = (room) => {
    console.log("try to delete room ", room);
    const inp = document.getElementById('rooms');
    const list = document.getElementById('rooms-list');
    const element = document.getElementById(room);
    list.removeChild(element);
    if (inp.value === room){
        inp.value = '';
    }
    socket.emit('disconnect room', room);
}

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
