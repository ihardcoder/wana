export class Tracker = {
    constructor(){
        this.data = {};
    }
    set({key,value}){
        this.data[key] = value;
    }
    get(key){
        return key ? this.data[key] : this.data;
    }
    send(data){

    }
};
