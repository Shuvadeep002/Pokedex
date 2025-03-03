import { Keyboard } from "react-native";
import { APIConstants } from "../assets/StaticText";
import { doGetApiCall, doPostApiCall } from "../utils/ApiServices";
import { store } from "../reduxStoreAndSlice/store";

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

// export const getPokemonList = (limit: number) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const response: any = await getResponse(APIConstants.POKEMON, limit);

//             const detailedPokemon = await Promise.all(
//                 response.results.map(async (poke: any) => {
//                     const singleResponse = await fetch(poke.url, { method: "GET" });
//                     const details = await singleResponse.json();
//                     return details;
//                 })
//             );

//             resolve(detailedPokemon);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };
export const getPokemonList = async (limit: number) => {
    try {
        const response: any = await getResponse(APIConstants.POKEMON, limit);
        const pokemonUrls = response.results.map((poke: any) => poke.url);

        // Fetch Pokémon details in chunks to improve performance
        const chunkSize = 10; // Adjust as needed
        const detailedPokemon = [];

        for (let i = 0; i < pokemonUrls.length; i += chunkSize) {
            const chunk = pokemonUrls.slice(i, i + chunkSize);
            const promises = chunk.map(url => fetch(url).then(res => res.json()));
            const results = await Promise.all(promises);
            detailedPokemon.push(...results);
        }

        return detailedPokemon;
    } catch (error) {
        throw error;
    }
};



export const IsFavorite = (data:any) => {
    const state = store.getState();
    const favoriteList = state.pokemonData.favoritePokemonList
    if(favoriteList?.length > 0){
      return favoriteList?.some((item) => item.id == data.id)
    }
    else{
      return false
    }
  }
