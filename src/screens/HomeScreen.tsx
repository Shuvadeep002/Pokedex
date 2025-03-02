import { FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useCommonStyles } from '../common/commonStyle'
import { APIConstants, StaticText } from '../assets/StaticText'
import { useAppDispatch, useAppSelector } from '../reduxStoreAndSlice/store'
import Icon2 from 'react-native-vector-icons/Feather';
import { StaticColors } from '../theme/StaticColors'
import SearchComponent from '../components/SearchComponent'
import { ScreenHeight, ScreenWidth } from '../common/ScreenHeightWidth'
import TypeList from '../components/TypeList'
import { F15W900Text, F20W900Text, F30W900Text } from '../components/TextComponents'
import PokemonCard from '../components/PokemonCard'
import { getPokemonList, getResponse } from '../common/commonFunctions'
import CustomFlatList from '../components/CustomFlatList'
import { useDispatch } from 'react-redux'
import { addPokemonList, setIndividualPokemon, setPokemonList } from '../reduxStoreAndSlice/pokemonSlice'
import { NavigationTypes } from '../common/commonTypes'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../theme/themeContext'

export default function HomeScreen() {
    const commonStyle = useCommonStyles()

    const { isDarkTheme, changeTheme } = useTheme()
    const dispatch = useDispatch()
    const navigation: NavigationTypes = useNavigation()
    const [Page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const PokemonList = useAppSelector(state => state.pokemonData.pokemonList)
    useEffect(() => {
        GetPokemon(0)
    }, [])

    const GetPokemon = (page: number) => {
        let DataQnty = page * 20
        setLoading(true)
        getPokemonList(DataQnty).then((response: any) => {
            setLoading(false)
            if (page == 0) {
                setPage(page + 1)
                dispatch(setPokemonList(response))
            }
            else {
                dispatch(addPokemonList(response))
                setPage(page + 1)
            }

        }).catch(() => { })
    }

    const NavigateToDetails = (data: any) => {
        dispatch(setIndividualPokemon(data))
        navigation.navigate("PokemonDetails")
    }

    return (
        <View style={commonStyle.mainContainer}>
            <Image style={styles.pokeballImage} source={require('../assets/Images/Pokeball.png')} />
            <View style={styles.headerContainer}>
                <F30W900Text>{StaticText.Pokedex}</F30W900Text>
                <View style={styles.switchContainer}>
                    <F15W900Text style={{ marginRight: 10 }}>{isDarkTheme ? StaticText.Dark : StaticText.Light}</F15W900Text>
                    <Switch value={isDarkTheme} onChange={() => {
                        changeTheme()
                    }} />
                </View>
            </View>
            <View style={styles.listContainer}>
                <CustomFlatList
                    loading={loading}
                    numColumns={2}
                    data={PokemonList}
                    renderItem={({ item, index }) =>
                        <PokemonCard
                            index={index}
                            data={item}
                            onPress={() => { NavigateToDetails(item) }}
                        />
                    }
                    onEndReached={() => { GetPokemon(Page) }}
                    onRefreshing={() => GetPokemon(0)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: StaticColors.skyBlue
    },
    headerContainer: {
        backgroundColor: "transparent",
        marginTop: ScreenWidth * 0.12,
        paddingHorizontal: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchContainer: {
        width: '100%',
        backgroundColor: StaticColors.bright,
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
    },
    listContainer: {
        height: ScreenHeight - 175
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})