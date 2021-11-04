
let sources = {}
module.exports = class Video {
    constructor(emitter){
        this.emitter = emitter;
    }
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    static setSource(id,stream){
        sources[id] = stream;
    }
    static getSource(id){
        return sources[id];
    }

    async createdAnswer(){
        const created = async()=>{setTimeout(()=>{
            console.log('created sdpAnswer');
        },3000)}
        await created();

    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    start(message){
        return new Promise(async (resolve,reject)=>{
            console.log('creating sdpAnswer',message);
            const result = true ;
            await this.sleep(5000);
            if(result){
                return resolve(1111);
            }else{
                return reject(1111);
            }
        })
    }
}