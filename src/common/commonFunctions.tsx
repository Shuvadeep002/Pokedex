import { Keyboard } from "react-native";
import { APIConstants } from "../assets/StaticText";
import { doGetApiCall, doPostApiCall } from "../utils/ApiServices";

export const getResponse = (endPoint: string, page: number) => {
    return new Promise(async function (resolve, reject) {
        doGetApiCall({
            BASE_URL: APIConstants.BASE_URL,
            endpoint: `${endPoint}?page=${page}`,
        }).then((response: any) => {
            console.log('==========>', response)
            if (response.message == "Success") {
                resolve(response)
            }
            else {
                reject(response)
            }
        }).catch((error) => {
            reject(error)
        })
    })
}
export const postResponse = (endPoint: string, body: any) => {
    return new Promise(async function (resolve, reject) {
        doPostApiCall({
            BASE_URL: APIConstants.BASE_URL,
            endpoint: `${endPoint}`,
            body: body
        }).then((response: any) => {
            console.log('==========>', response)
            if (response.message == "Success") {
                resolve(response)
            }
            else {
                reject(response)
            }
        }).catch((error) => {
            reject(error)
        })
    })
}
export const getPokemonTypes = () => {
    return new Promise(async function (resolve, reject) {
        doGetApiCall({
            BASE_URL: APIConstants.BASE_URL,
            endpoint: APIConstants.POKEMON_TYPE,
        }).then((response: any) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}