export function isEmptyObj(obj){
    for(let name in obj){
        return false;
    }
    return true;
}