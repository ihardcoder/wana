export class Tracker {
    constructor(){
        this.data = {};
    }
    set(options){
        let {key,value} = options;
        this.data[key] = value;
    }
    get(key){
        return key ? this.data[key] : this.data;
    }
    send(){

    }
}
