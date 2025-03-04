import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import pokemonSlice, { PokemonState } from './pokemonSlice';


export interface RootState {
    pokemonData: PokemonState
}
const rootReducer = combineReducers({
    pokemonData: pokemonSlice
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(logger),
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
