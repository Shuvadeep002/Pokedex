import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useCommonStyles } from '../common/commonStyle'
import FavouriteCard from '../components/FavouriteCard'
import { useAppSelector } from '../reduxStoreAndSlice/store'
import { DarkTheme, LightTheme, StaticColors } from '../theme/StaticColors'
import { Anime, NavigationTypes } from '../common/commonTypes'
import Icon2 from 'react-native-vector-icons/EvilIcons';
import PokemonCard from '../components/PokemonCard'
import { useDispatch } from 'react-redux'
import { setIndividualPokemon } from '../reduxStoreAndSlice/pokemonSlice'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../theme/themeContext'
import { TextStyle } from 'react-native'

export default function Favorites() {
  const { isDarkTheme } = useTheme()
  const commonStyle = useCommonStyles()
  const dispatch = useDispatch()
  const navigation: NavigationTypes = useNavigation()
  const [text, setText] = useState('')
  const [searchedItem, setSearchedItem] = useState<Anime[]>([])
  const FavoriteList = useAppSelector(state => state.pokemonData.favoritePokemonList)

  const HandleChange = (t: string) => {
    setText(t);
    setSearchedItem(FavoriteList.filter((item: any) => item?.name?.toLowerCase()?.includes(t?.toLowerCase())));
  };
  const NavigateToDetails = (data: any) => {
    dispatch(setIndividualPokemon(data))
    navigation.navigate("PokemonDetails")
  }
  return (
    <View style={commonStyle.mainContainer}>
      <View style={styles.textContainer}>
        <Icon2 name="search" size={30} color={StaticColors.charcoal} />
        <TextInput
          placeholder={'Search pokemon'}
          placeholderTextColor={StaticColors.grey}
          style={textInput(isDarkTheme)}
          value={text}
          onChangeText={(t) => HandleChange(t)}
        />
      </View>
      <FlatList
        numColumns={2}
        data={text?.length > 0 ? searchedItem : FavoriteList}
        renderItem={({ item, index }) =>
          <PokemonCard
            index={index}
            data={item}
            onPress={() => { NavigateToDetails(item) }}
          />
        }
      />
    </View>
  )
}

const textInput = (darkMode: boolean): TextStyle => ({
  color: darkMode ? DarkTheme.bright : LightTheme.bright,
  marginHorizontal: 5,
  fontSize: 17,
  flex: 1
})
const styles = StyleSheet.create({
  textContainer: {
    borderWidth: 1,
    borderColor: StaticColors.charcoal,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginHorizontal: 15
  }
})