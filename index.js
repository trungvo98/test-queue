const VideoManager = require('./VideoManager');
const EventEmitter = require("events").EventEmitter
const manager = new VideoManager();

const emitter = new EventEmitter();
//manager.startQueueShare();
//cmanager.startQueueView();
  const message = {
    id : 1,
    type: 'share'
   }
   const message2 = {
    id : 2,
    type: 'view'
   }
   const message3 = {
    id : 3,
    type: 'view'
   }
   const message4 = {
    id : 4,
    type: 'view'
   }
   const message5 = {
    id : 5,
    type: 'view'
   }
   const message6 = {
    id : 6,
    type: 'view'
   }
   const message7 = {
    id : 7,
    type: 'view'
   }
   const message8 = {
    id : 8,
    type: 'share'
   }
   manager.onMessage(message);
   manager.onMessage(message2);
   manager.onMessage(message3);
   manager.onMessage(message4);
   manager.onMessage(message5);
   manager.onMessage(message6);
   manager.onMessage(message7);

   setTimeout(()=>{
     manager.onMessage(message8)
   },60000);
   setTimeout(()=>{
    manager.onMessage(message8)
  },61000);

