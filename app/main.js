console.log('app started');
var ID = '';
for(let i = 0; i < 5; i++) {
  ID += Math.floor(Math.random() * 10);
}
var name = prompt('Enter your name:');

var socket = io.connect('', {query: 'name='+name+'&id='+ID});

var chat = document.getElementById('chat');
var textBox = document.getElementById('text');

function enter() {
  if(textBox.value != '') {
    if(textBox.value.substring(0, 1) != '/') {
      socket.emit('enter', name, ID, textBox.value);
    } else {
      if(textBox.value.length >= 11 && textBox.value.substring(0, 5) == '/msg ') {
        str = textBox.value.substring(5, 10);
        socket.emit('pm', {'name': name, 'id':ID}, parseInt(str, 10), textBox.value.substring(11, textBox.value.length));
      } else {
        alert('Command unrecognized...');
      }
    }
    textBox.value = '';
  }
}

socket.on('enter', function(player, id, msg) {
  //console.log(player+': '+msg);
  chat.innerHTML += '<li><b class="name" title="#'+id+'">'+(id == ID ? 'You':player)+'</b><em> whispers to you </em><span class="msg">'+msg+'</span></li>';
});

socket.on('pm', function(sender, target, msg) {
  if(target == ID || sender.id == ID) {
    chat.innerHTML += '<li class="whisper"><b class="name" title="#'+sender.id+'">'+(sender.id == ID ? 'You':sender.name)+'</b>: <span class="msg">'+msg+'</span></li>';
  }
});

socket.on('clear', function(msg) {
  chat.innerHTML = '<li>'+msg+'</li>';
});
