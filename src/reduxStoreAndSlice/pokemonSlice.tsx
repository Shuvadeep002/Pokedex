import { createSlice } from '@reduxjs/toolkit';
import { Anime } from '../common/commonTypes';
import { setItemInStorage } from '../utils/AsyncStorageService';
import { StaticText } from '../assets/StaticText';
export interface PokemonState {
    pokemonTypes: any
    pokemonList: any
    pokemonDetails: any
    favoritePokemonList: any
}
const initialState: PokemonState = {
    pokemonTypes: [],
    pokemonList: [],
    pokemonDetails: {},
    favoritePokemonList: []
};
export const pokemonSlice = createSlice({
    name: 'pokemonSlice',
    initialState,
    reducers: {
        setPokemonTypes: (state, action) => {
            state.pokemonTypes = action.payload
        },
        setPokemonList: (state, action) => {
            state.pokemonList = action.payload;
            setItemInStorage({
                key: StaticText.POKEMON_LIST,
                value: JSON.stringify(action.payload),
            })
        },
        addPokemonList: (state, action) => {
            let data = state.pokemonList.concat(action.payload)
            state.pokemonList = data
            setItemInStorage({
                key: StaticText.POKEMON_LIST,
                value: JSON.stringify(data),
            })
        },
        setIndividualPokemon: (state, action) => {
            state.pokemonDetails = action.payload
        },
        setFavoritePokemonList: (state, action) => {
            state.favoritePokemonList = action.payload
        }
    }
})

export const {
    setPokemonTypes,
    setPokemonList,
    addPokemonList,
    setIndividualPokemon,
    setFavoritePokemonList
} = pokemonSlice.actions;

export default pokemonSlice.reducer;