
const Video = require('./video');
const EventEmitter = require('events');

const Queue = require('queue');
const { resolve } = require('path');

module.exports = class VideoManager {
    constructor() {
        this.queueShare = Queue({
          concurrency : 1,
          autostart: true,
          timeout: 20000,
        }),
        this.queueView = Queue({
          concurrency : 1,
          autostart: true,
          timeout: 30000,
        })
        this.queueShare.on('end',this._setConcurrencyQueueView.bind(this));
        this.queueView.on('end',this._setConcurrencyQueueView.bind(this));
        //this.queueShare = null;
        //this.queueView = null;
        //this.emitter = new EventEmitter();
    }
    _setConcurrencyQueueView(){
      if(this.queueView.length > 1 ) {
        console.log('queue share empty , increase view concurrency')
        this.queueView.concurrency = 2 ;
      } else if(this.queueView.concurrency == 2){
        console.log('queue view empty')
        this.queueView.concurrency = 1 ; 
      }
    }

    getTimes(){
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return time;
    }

    setConcurrency(concurrency){
      this.queueShare.concurrency = concurrency;
    }

    listenQueue(){
      this.queueShare.on('end',()=>{
        if (this.queueView.length > 0) {
          this.queueView.concurrency = 30 ;
        }
      });
      this.queueView.on('end',()=>{

      })
    }


    async handleStart (message) {
      console.log(`start task thu' ${message.id} and type ${message.type} at ${this.getTimes()}`);
      const emitter = new EventEmitter();
      let video = new Video(
        emitter,
      );
      return video.start(message)
      .then(mes=>{
        console.log(`end task thu' ${message.id} and type ${message.type} at ${this.getTimes()}`);
        console.log('--------------------------------------------');
      })
      .catch(err=>{
        console.log('error create media',err);
        console.log('--------------------------------------------');
      });
      
    }
    sendSdpAnswer(message){
      return new Promise(async (resolve, reject) => {
        await this.handleStart(message);
        resolve();
      })
    }

    async executeTask(message){
      const negotiated = () =>{
        return new Promise(async(resolve,reject)=>{
          await this.handleStart(message);
          return resolve(true);
        })
      }
      const failOver = () =>{
        return new Promise((resolve,reject)=>{
          setTimeout(()=>{
            resolve(false);
          },10000)
        })
      }
      return Promise.race([negotiated(),failOver()]);
    }
    /*startQueueShare(){
      if(this.queueShare){
        return;
      }
      var options = {
        concurrency : 1,
        autostart : true,
        timeout : 12000
      }
      this.queueShare = Queue(options);
      this.queueShare.on('end',()=>{
        console.log('queueShare empty')
        this.emitter.emit('empty');
      })
    }
    startQueueView(){
      if (this.queueView) {
        return;
      }
      var options = {
        concurrency :1,
        autostart : true,
        timeout : 12000
      }
      this.queueView = Queue(options);
      this.emitter.on('empty',()=>{
        console.log('queueView has :',this.queueView.length);
        if (this.queueView.length > 0) {
          this.queueView.concurrency = 2 ; 
        }
      });
      this.queueView.on('end',()=>{
        console.log('queueView empty');
        this.queueView.concurrency = 1;
      })
    }*/
    onMessage(message){
      if(message.type == 'share'){
        this.queueShare.push(()=> this.executeTask(message));
      }else{
        this.queueView.push(()=> this.executeTask(message));
      }
    }
}

