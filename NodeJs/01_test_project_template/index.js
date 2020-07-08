
const EventEmitter = require('events');

const emitter = new EventEmitter();

//emitter.on == emitter.addListener
emitter.on('messageLogged' , function(arg){
  console.log('Listener Called !!' , arg);
});

emitter.emit('messageLogged' , {id : 1 , url : 'http://google.com'});
