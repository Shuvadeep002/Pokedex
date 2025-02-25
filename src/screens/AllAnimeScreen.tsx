import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { APIConstants } from '../assets/StaticText';
import { commonStyle } from '../common/commonStyle';
import { getResponse } from '../common/commonFunctions';
import { useDispatch } from 'react-redux';
import { Anime, NavigationTypes } from '../common/commonTypes';
import { addLastCompletedList, addMostFavouritList, addMostPopularList, addRecentlyAdded, addRecentlyUpdated, addTopAriningList, setIndividualAnime, setLastCompletedList, setMostFavouritList, setMostPopularList, setRecentlyAdded, setRecentlyUpdated, setTopAriningList } from '../reduxStoreAndSlice/animeSlice';
import { useAppSelector } from '../reduxStoreAndSlice/store';
import CustomFlatList from '../components/CustomFlatList';
import Loader from '../common/Loader';
import AnimeCards from '../components/AnimeCards';

export default function AllAnimeScreen() {
    const navigation: NavigationTypes = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch()
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const MostPopularList = useAppSelector(state => state.animeData.mostPopularList)
    const MostFavoutireList = useAppSelector(state => state.animeData.mostFavoriteList)
    const LastCompletedList = useAppSelector(state => state.animeData.lastCompletedList)
    const RecentlyAdded = useAppSelector(state => state.animeData.recentlyAdded)
    const RecentlyUpdated = useAppSelector(state => state.animeData.recentlyUpdated)
    const TopAriningList = useAppSelector(state => state.animeData.topAriningList)

    useEffect(() => {
        GetAllAnimeList(1, false)
    }, []);

    const GetAllAnimeList = (Page: number, returnData?: boolean) => {
        setLoading(true)
        switch (route.params?.screen) {
            case APIConstants.MOST_POPULAR: {
                getResponse(APIConstants.MOST_POPULAR, Page).then((response: any) => {
                    setLoading(false)
                    const value = response?.data?.results as Anime[]
                    if (Page == 1) {
                        dispatch(setMostPopularList(value))
                    }
                    else {
                        dispatch(addMostPopularList(value))
                    }
                    setPage(Page + 1)
                }).catch(() => { })
                break;

            }
            case APIConstants.MOST_FAVORITE: {
                getResponse(APIConstants.MOST_FAVORITE, 1).then((response: any) => {
                    setLoading(false)
                    const value = response?.data?.results as Anime[]
                    if (Page == 1) {
                        dispatch(setMostFavouritList(value))
                    }
                    else {
                        dispatch(addMostFavouritList(value))
                    }
                    setPage(Page + 1)

                }).catch(() => { })
                break;

            }
            case APIConstants.LATEST_COMPLETED: {
                getResponse(APIConstants.LATEST_COMPLETED, 1).then((response: any) => {
                    setLoading(false)
                    const value = response?.data?.results as Anime[]
                    if (Page == 1) {
                        dispatch(setLastCompletedList(value))
                    }
                    else {
                        dispatch(addLastCompletedList(value))
                    }
                    setPage(Page + 1)

                }).catch(() => { })
                break;

            }
            case APIConstants.RECENTLY_ADDED: {
                getResponse(APIConstants.RECENTLY_ADDED, 1).then((response: any) => {
                    setLoading(false)
                    console.log('Enter', response)
                    const value = response?.data?.results as Anime[]
                    if (Page == 1) {
                        dispatch(setRecentlyAdded(value))
                    }
                    else {
                        dispatch(addRecentlyAdded(value))
                    }
                    setPage(Page + 1)

                }).catch(() => { })
                break;

            }
            case APIConstants.RECENTLY_UPDATED: {
                getResponse(APIConstants.RECENTLY_UPDATED, 1).then((response: any) => {
                    setLoading(false)
                    console.log('Enter', response)
                    const value = response?.data?.results as Anime[]
                    if (Page == 1) {
                        dispatch(setRecentlyUpdated(value))
                    }
                    else {
                        dispatch(addRecentlyUpdated(value))
                    }
                    setPage(Page + 1)

                }).catch(() => { })
                break;

            }
            case APIConstants.TOP_AIRING: {
                getResponse(APIConstants.TOP_AIRING, 1).then((response: any) => {
                    setLoading(false)
                    console.log('Enter', response)
                    const value = response?.data?.results as Anime[]
                    if (Page == 1) {
                        dispatch(setTopAriningList(value))
                    }
                    else {
                        dispatch(addTopAriningList(value))
                    }
                    setPage(Page + 1)

                }).catch(() => { })
                break;
            }

        }
    }
    const GetData = () => {
        switch (route.params?.screen) {
            case APIConstants.MOST_POPULAR: {
                return MostPopularList
            }
            case APIConstants.MOST_FAVORITE: {
                return MostFavoutireList
            }
            case APIConstants.LATEST_COMPLETED: {
                return LastCompletedList;
            }
            case APIConstants.RECENTLY_ADDED: {
                return RecentlyAdded
            }
            case APIConstants.RECENTLY_UPDATED: {
                return RecentlyUpdated;
            }
            case APIConstants.TOP_AIRING: {
                return TopAriningList
            }
        }
    }
    return (
        <View style={[commonStyle.mainContainerWithPadding, { width: Dimensions.get('window').width }]}>
            {(loading && page == 1) ? <View style={styles.loadingContainer}><Loader /></View> :
                <CustomFlatList
                    numColumns={2}
                    loading={loading}
                    data={GetData()}
                    renderItem={({ item }: { item: Anime }) =>
                        <View>
                            <AnimeCards
                                Customwidth={Dimensions.get('window').width * 0.44}
                                title={item.title}
                                url={item.image}
                                onPress={() => {
                                    dispatch(setIndividualAnime(item))
                                    navigation.navigate("IndividualAnimePage")
                                }} />
                        </View>}
                    onEndReached={() => GetAllAnimeList(page, false)}
                    onRefreshing={() => GetAllAnimeList(1, false)}
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})