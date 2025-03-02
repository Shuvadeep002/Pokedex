import { FlatList, Image, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { useCommonStyles } from '../../common/commonStyle'
import { useAppSelector } from '../../reduxStoreAndSlice/store'
import BackBtn from '../../components/BackBtn'
import { NavigationTypes } from '../../common/commonTypes'
import { useNavigation } from '@react-navigation/native'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { DarkTheme, LightTheme, StaticColors } from '../../theme/StaticColors'
import { F10W900Text, F15W900Text, F30W900Text } from '../../components/TextComponents'
import { getPokemonName } from '../../common/commonFunctions'
import PokemonTypeItem from '../../components/PokemonTypeItem'
import { StaticText } from '../../assets/StaticText'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CustomTabs from '../../components/CustomTabs'
import PokemonStats from './PokemonStats'
import PokemonMoves from './PokemonMoves'
import PokemonAbilities from './PokemonAbilities'
import { useTheme } from '../../theme/themeContext'
const Tab = createMaterialTopTabNavigator();

export default function PokemonDetails() {
    const navigation: NavigationTypes = useNavigation()
    const PokemonDetails = useAppSelector(state => state.pokemonData.pokemonDetails)
    const commonStyle = useCommonStyles()
    const { isDarkTheme } = useTheme()
    return (
        <View style={commonStyle.mainContainer}>
            <View style={styles.topContainer}>
                <View style={styles.headerContainer}>
                    <BackBtn onPress={() => { navigation.goBack() }} />
                    <TouchableOpacity>
                        <Icon2 name="favorite-border" size={25} color={StaticColors.bright} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.topSubContainer}>
                <View style={styles.nameContainer}>
                    <F30W900Text>{getPokemonName(PokemonDetails?.name)}</F30W900Text>
                    <F15W900Text>#{String(PokemonDetails?.id).padStart(3, '0')}</F15W900Text>
                </View>
                <View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={PokemonDetails?.types}
                        renderItem={(({ item }) =>
                            <PokemonTypeItem
                                name={item?.type?.name}
                                style={{
                                    marginRight: 10, backgroundColor: isDarkTheme ?
                                        DarkTheme.lightWithOpacity(0.2) :
                                        LightTheme.lightWithOpacity(0.2)
                                }} />
                        )}
                    />
                </View>
                <Image
                    style={styles.pokemonImage}
                    source={{ uri: PokemonDetails?.sprites.other["official-artwork"]?.front_default }} />
            </View>
            <View style={bottomSubContainer(isDarkTheme)}>
                <View style={styles.heightWeightContainer}>
                    <View style={styles.heightSubContainer}>
                        <PokemonTypeItem
                            returnNumber
                            name={`${PokemonDetails.height}  M`}
                            style={heightWeightCard(isDarkTheme)} />
                        <Text style={heightweightText(isDarkTheme)}>{StaticText.Height}</Text>
                    </View>
                    <View style={styles.heightSubContainer}>
                        <PokemonTypeItem
                            returnNumber
                            name={`${PokemonDetails.weight}  KG`}
                            style={heightWeightCard(isDarkTheme)} />
                        <Text style={heightweightText(isDarkTheme)}>{StaticText.Weight}</Text>
                    </View>
                </View>
                <View style={styles.tabContainer}>
                    <Tab.Navigator tabBar={(props) => <CustomTabs {...props} />} >
                        <Tab.Screen name="Stats" children={() => <PokemonStats data={PokemonDetails?.stats} />} />
                        <Tab.Screen name="Moves" children={() => <PokemonMoves data={PokemonDetails?.moves} />} />
                        <Tab.Screen name="Abilities" children={() => <PokemonAbilities data={PokemonDetails?.abilities} />} />
                    </Tab.Navigator>
                </View>
            </View>
        </View>
    )
}

const bottomSubContainer = (darkMode: boolean): ViewStyle => ({
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: darkMode ? DarkTheme.bright : LightTheme.bright
})
const heightweightText = (darkMode: boolean): TextStyle => ({
    fontSize: 17,
    color: darkMode ? DarkTheme.background : LightTheme.background,
    alignSelf: 'center',
    marginVertical: 5
})
const heightWeightCard = (darkMode: boolean): ViewStyle => ({
    backgroundColor: darkMode ? DarkTheme.background : LightTheme.background,
    paddingVertical: 10,
    alignItems: 'center'
})
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    topContainer: {
        padding: 20
    },
    topSubContainer: {
        flex: 0.42,
        paddingHorizontal: 20
    },
    pokemonImage: {
        height: 185,
        width: 185,
        zIndex: 2,
        bottom: 10,
        alignSelf: 'center'
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    heightWeightContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    heightSubContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    tabContainer: {
        flex: 1,
    }
})