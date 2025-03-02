import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useCommonStyles } from '../common/commonStyle'
import FavouriteCard from '../components/FavouriteCard'
import { useAppSelector } from '../reduxStoreAndSlice/store'
import { StaticColors } from '../theme/StaticColors'
import { Anime } from '../common/commonTypes'
import Icon2 from 'react-native-vector-icons/EvilIcons';

export default function Favorites() {
  const commonStyle = useCommonStyles()

  const [text, setText] = useState('')
  const [searchedItem, setSearchedItem] = useState<Anime[]>([])
  const FavouriteList: Anime[] = useAppSelector(state => state.animeData.favouriteList)
  const HandleChange = (t: string) => {
    setText(t);
    setSearchedItem(FavouriteList.filter((item: Anime) => item?.title?.includes(t)));
  };
  return (
    <View style={commonStyle.mainContainerWithPadding}>
      <View style={styles.textContainer}>
        <Icon2 name="search" size={30} color={StaticColors.charcoal} />
        <TextInput
          placeholder={'Search pokemon'}
          style={styles.textInput}
          value={text}
          onChangeText={(t) => HandleChange(t)}
        />
      </View>
      <FlatList
        data={searchedItem?.length > 0 ? searchedItem : FavouriteList}
        renderItem={({ item }) =>
          <FavouriteCard data={item} />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    borderWidth: 1,
    borderColor: StaticColors.charcoal,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:5
  },
  textInput: {
    color: StaticColors.bright,
    marginHorizontal: 5,
    fontSize: 17
  }
})