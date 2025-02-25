import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyle } from '../common/commonStyle'
import AnimeCards from '../components/AnimeCards'
import AnimeListComponent from '../components/AnimeListComponent'
import { getResponse } from '../common/commonFunctions'
import { APIConstants, StaticText } from '../assets/StaticText'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../reduxStoreAndSlice/store'
import { setLastCompletedList, setMostFavouritList, setMostPopularList, setRecentlyAdded, setRecentlyUpdated, setTopAriningList } from '../reduxStoreAndSlice/animeSlice'
import { Anime, AnimeData, ApiResponse, NavigationTypes } from '../common/commonTypes'
import { useNavigation } from '@react-navigation/native'
import Icon2 from 'react-native-vector-icons/Feather';
import { StaticColors } from '../assets/StaticColors'
import SearchComponent from '../components/SearchComponent'
import { ScreenHeight, ScreenWidth } from '../common/ScreenHeightWidth'
import TypeList from '../components/TypeList'

export default function HomeScreen() {
    const [visible, setVisible] = useState(false)
    const dispatch = useAppDispatch()
    const PokemonTypes = useAppSelector(state => state.pokemonData.pokemonTypes)
    return (
        <View style={commonStyle.mainContainer}>
            <View style={styles.headerContainer}>
                <Image style={styles.pokeballImage} source={require('../assets/Images/Pokeball.png')} />
                <SearchComponent modalVisible={visible} setModalVisible={() => setVisible(false)} />
                <Text style={[commonStyle.f35W900Text, { fontWeight: 600, width: ScreenWidth * 0.73, zIndex: 3 }]}>
                    {StaticText.WhatPokemon}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => setVisible(true)}
                    style={styles.searchContainer}>
                    <Icon2 name="search" size={30} color={StaticColors.background} />
                    <Text style={styles.placeHolderText}>{StaticText.SearchPokemon}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <TypeList data={PokemonTypes} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: StaticColors.skyBlue
    },
    headerContainer: {
        backgroundColor: StaticColors.red,
        height: ScreenHeight * 0.35,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        padding: 15,
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    searchContainer: {
        width: '100%',
        backgroundColor: StaticColors.white,
        borderRadius: 35,
        flexDirection: 'row',
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    placeHolderText: {
        marginHorizontal: 10,
        fontSize: 17,
        color: StaticColors.grey
    },
    pokeballImage: {
        height: ScreenWidth * 0.5,
        width: ScreenWidth * 0.5,
        position: 'absolute',
        top: -35,
        right: -35,
        resizeMode: 'contain',
        opacity: 0.4
    },
    bottomContainer: {
        marginTop: 10,
        marginBottom: 280
    }
})