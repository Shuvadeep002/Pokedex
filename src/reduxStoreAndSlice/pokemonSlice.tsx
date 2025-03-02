import { createSlice } from '@reduxjs/toolkit';
import { Anime } from '../common/commonTypes';
export interface PokemonState {
    pokemonTypes: any
    pokemonList: any
    pokemonDetails: any
}
const initialState: PokemonState = {
    pokemonTypes: [],
    pokemonList: [],
    pokemonDetails: {}
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
        },
        addPokemonList: (state, action) => {
            state.pokemonList = state.pokemonList.concat(action.payload)
        },
        setIndividualPokemon: (state, action) => {
            state.pokemonDetails = action.payload
        }
    }
})

export const {
    setPokemonTypes,
    setPokemonList,
    addPokemonList,
    setIndividualPokemon
} = pokemonSlice.actions;

export default pokemonSlice.reducer;