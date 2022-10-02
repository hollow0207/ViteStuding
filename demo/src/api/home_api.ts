import request from "../utils/request";

export function getUserEventList():Promise<unknown>{
    return request('/mock/home/userEventList', 'get')

}


export function getAllEventList():Promise<unknown>{
    return request('/mock/home/allEventList', 'get')
}
