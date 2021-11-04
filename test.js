

const EventEmitter = require('events');

function waitForEvent(){
    const negotiated = () => {
      return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log(`[test message queue] negotiated success `);
            return resolve();
          },1000);
      });
    };
    const fail = () => {
      return new Promise((resolve)=>{
        setTimeout(()=>{
          console.log(`[test message queue] negotiated timeout `);
          return resolve();
        },30000);
      });
    };
    return Promise.race([negotiated(),fail()]);
} 

waitForEvent();