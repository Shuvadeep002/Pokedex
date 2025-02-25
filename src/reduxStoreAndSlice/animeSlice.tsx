import { createSlice } from '@reduxjs/toolkit';
import { Anime } from '../common/commonTypes';
export interface AnimeState {
    mostPopularList: Anime[],
    mostFavoriteList: Anime[],
    lastCompletedList: Anime[],
    topAriningList: Anime[],
    recentlyUpdated: Anime[],
    recentlyAdded: Anime[],
    individualAnime: Anime,
    favouriteList: Anime[]
}
const initialState: AnimeState = {
    mostPopularList: [],
    mostFavoriteList: [],
    lastCompletedList: [],
    topAriningList: [],
    recentlyUpdated: [],
    recentlyAdded: [],
    individualAnime: {},
    favouriteList: []
};
export const animeSlice = createSlice({
    name: 'animeSlice',
    initialState,
    reducers: {
        setMostPopularList: (state, action) => {
            state.mostPopularList = action.payload;
        },
        addMostPopularList: (state, action) => {
            state.mostPopularList = state.mostPopularList.concat(action.payload);
        },
        setMostFavouritList: (state, action) => {
            state.mostFavoriteList = action.payload;
        },
        addMostFavouritList: (state, action) => {
            state.mostFavoriteList = state.mostFavoriteList.concat(action.payload);
        },
        setLastCompletedList: (state, action) => {
            state.lastCompletedList = action.payload;
        },
        addLastCompletedList: (state, action) => {
            state.lastCompletedList = state.lastCompletedList.concat(action.payload);
        },
        setTopAriningList: (state, action) => {
            state.topAriningList = action.payload;
        },
        addTopAriningList: (state, action) => {
            state.topAriningList = state.topAriningList.concat(action.payload);
        },
        setRecentlyUpdated: (state, action) => {
            state.recentlyUpdated = action.payload;
        },
        addRecentlyUpdated: (state, action) => {
            state.recentlyUpdated = state.recentlyUpdated.concat(action.payload);
        },
        setRecentlyAdded: (state, action) => {
            state.recentlyAdded = action.payload;
        },
        addRecentlyAdded: (state, action) => {
            state.recentlyAdded = state.recentlyAdded.concat(action.payload);
        },
        setIndividualAnime: (state, action) => {
            state.individualAnime = action.payload;
        },
        addFavouriteList: (state, action) => {
            state.favouriteList = state.favouriteList.concat(action.payload)
        },
        setFavouriteList: (state, action) => {
            state.favouriteList = action.payload
        },
        removeFromFavoutire: (state, action) => {
            const { id } = action.payload
            state.favouriteList = state?.favouriteList?.filter((item) => item?.id != id)
        }
    }
})

export const {
    setMostPopularList,
    addMostPopularList,
    setMostFavouritList,
    addMostFavouritList,
    setLastCompletedList,
    addLastCompletedList,
    setTopAriningList,
    addTopAriningList,
    setRecentlyUpdated,
    addRecentlyUpdated,
    setRecentlyAdded,
    addRecentlyAdded,
    setIndividualAnime,
    addFavouriteList,
    setFavouriteList,
    removeFromFavoutire
} = animeSlice.actions;

export default animeSlice.reducer;