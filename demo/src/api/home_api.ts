import request from "../utils/request";

export function getUserEventList():Promise<unknown>{
    return request('/mock/home/userEventList', 'get')

}

// export async function getUserEventList(){
//     let result = await fun()
//     console.log(result);
//     return result
// }

