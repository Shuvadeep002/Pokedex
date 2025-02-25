import { Alert, Dimensions, Image, ImageStyle, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyle } from '../common/commonStyle'
import { useAppDispatch, useAppSelector } from '../reduxStoreAndSlice/store'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/Ionicons';
import { StaticColors } from '../assets/StaticColors'
import { NavigationTypes } from '../common/commonTypes'
import { useNavigation } from '@react-navigation/native'
import { setItemInStorage } from '../utils/AsyncStorageService'
import { StaticText } from '../assets/StaticText'
import { useDispatch } from 'react-redux'
import { addFavouriteList, removeFromFavoutire } from '../reduxStoreAndSlice/animeSlice'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const { height, width } = Dimensions.get('window')
export default function IndividualAnimePage() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const navigation: NavigationTypes = useNavigation()
  const AnimeData = useAppSelector(state => state.animeData.individualAnime)
  const FavouriteList = useAppSelector(state => state.animeData.favouriteList)

  const handleOpenURL = async () => {
    const url = AnimeData.url;
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while trying to open the URL.');
    }
  };

  const handelFavourite = () => {
    if (IsFavourite()) {
      setItemInStorage({
        key: StaticText.ANIME_LIST,
        value: JSON.stringify(FavouriteList.filter((item) => item.id != AnimeData.id)),
      }).then(() => {
        dispatch(removeFromFavoutire(AnimeData))
      });
    }
    else {
      setItemInStorage({
        key: StaticText.ANIME_LIST,
        value: JSON.stringify([...(FavouriteList || []), AnimeData]),
      }).then(() => {
        dispatch(addFavouriteList(AnimeData))
      });
    }
  }

  const IsFavourite = () => {
    if(FavouriteList?.length > 0){
      return FavouriteList?.some((item) => item.id == AnimeData.id)
    }
    else{
      return false
    }
  }

  return (
    <View style={commonStyle.mainContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Icon4 name="arrow-back" size={25} color={StaticColors.white} />
        </TouchableOpacity>
        {loading && (
          <ShimmerPlaceholder style={styles.imageContainer} />
        )}
        <Image
          style={imageStyle(loading)}
          source={{ uri: AnimeData.image }}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
        />
      </View>
      <View style={commonStyle.mainContainerWithPadding}>
        <View style={styles.headerContainer}>
          <View style={{ width: width * 0.85 }}>
            <Text style={commonStyle.f20W900Text}>{AnimeData.title}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handelFavourite()}
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
            {IsFavourite() ?
              <Icon2 name="favorite" size={30} color={StaticColors.yellow} />
              :
              <Icon2 name="favorite-border" size={30} color={StaticColors.white} />

            }
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => { handleOpenURL() }}
          style={styles.watchBtn}>
          <Text style={commonStyle.f15W500Text}>Watch</Text>
          <View style={{ width: 5 }} />
          <Icon3 name="link" size={17} color={StaticColors.white} />
        </TouchableOpacity>
        <View >
          <Text style={commonStyle.f15W500Text}>Episode duration: {AnimeData.duration}</Text>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.infoContainer}>
            <Text style={commonStyle.f15W500Text}>Dub: {AnimeData.dub}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={commonStyle.f15W500Text}>Sub: {AnimeData.sub}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const imageStyle = (isLoading: boolean): ImageStyle => ({
  flex: 1,
  resizeMode: 'cover',
  opacity: isLoading ? 0 : 1,
})
const styles = StyleSheet.create({
  imageContainer: {
    height: width * 0.65,
    width: width
  },
  headerContainer: {
    flexDirection: 'row'
  },
  watchBtn: {
    backgroundColor: StaticColors.skyBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignSelf: 'flex-start',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
    flexDirection: 'row'
  },
  infoContainer: {
    backgroundColor: StaticColors.charcoal,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 15,
    borderRadius: 20
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
    // justifyContent: 'space-around'
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: StaticColors.background,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4
  }
})