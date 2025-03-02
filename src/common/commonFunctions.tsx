import { Keyboard } from "react-native";
import { APIConstants } from "../assets/StaticText";
import { doGetApiCall, doPostApiCall } from "../utils/ApiServices";

export const getResponse = (endPoint: string, page: number) => {
    return new Promise(async function (resolve, reject) {
        doGetApiCall({
            BASE_URL: APIConstants.BASE_URL,
            endpoint: `${endPoint}?offset=${page}&limit=20`,
        }).then((response: any) => {
            resolve(response)
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

export const getPokemonName = (name?: string) => {
    let nameArr = name?.split("-")
    let result = nameArr?.map((item) => `${item?.[0]?.toUpperCase()}${item?.slice(1)}`).join(" ")
    return result;
}

export const getPokemonList = (limit: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response: any = await getResponse(APIConstants.POKEMON, limit);

            const detailedPokemon = await Promise.all(
                response.results.map(async (poke: any) => {
                    const singleResponse = await fetch(poke.url, { method: "GET" });
                    const details = await singleResponse.json();
                    return details;
                })
            );

            resolve(detailedPokemon);
        } catch (error) {
            reject(error);
        }
    });
};
