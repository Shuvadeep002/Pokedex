import { createSlice } from '@reduxjs/toolkit';
import { Anime } from '../common/commonTypes';
export interface PokemonState {
    pokemonTypes: any
}
const initialState: PokemonState = {
    pokemonTypes: []
};
export const pokemonSlice = createSlice({
    name: 'pokemonSlice',
    initialState,
    reducers: {
        setPokemonTypes: (state, action) => {
            state.pokemonTypes = action.payload
        }
    }
})

export const {
    setPokemonTypes
} = pokemonSlice.actions;

export default pokemonSlice.reducer;