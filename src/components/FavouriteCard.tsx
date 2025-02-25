import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StaticColors } from '../assets/StaticColors'
import { commonStyle } from '../common/commonStyle'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Anime, NavigationTypes } from '../common/commonTypes';
import { StaticText } from '../assets/StaticText';
import { setItemInStorage } from '../utils/AsyncStorageService';
import { useAppDispatch, useAppSelector } from '../reduxStoreAndSlice/store';
import { removeFromFavoutire, setIndividualAnime } from '../reduxStoreAndSlice/animeSlice';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')
export default function FavouriteCard({ data }: { data: Anime }) {
    const FavouriteList = useAppSelector(state => state.animeData.favouriteList)
    const dispatch = useAppDispatch()
    const navigation: NavigationTypes = useNavigation()

    const RemoveFromFavourites = () => {
        Alert.alert('Warning!!!', 'Are you sure you want to remove this anime from favourites?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    setItemInStorage({
                        key: StaticText.ANIME_LIST,
                        value: JSON.stringify(FavouriteList.filter((item) => item.id != data.id)),
                    }).then(() => {
                        dispatch(removeFromFavoutire(data))
                    });
                }
            },
        ]);

    }
    return (
        <TouchableOpacity
            onPress={() => {
                dispatch(setIndividualAnime(data))
                navigation.navigate("IndividualAnimePage")
            }}
            style={styles.main}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: data.image }}
                />
            </View>
            <View style={{ width: 20 }} />
            <View style={{ flex: 1 }}>
                <Text style={commonStyle.f20W900Text}>{data.title}</Text>
            </View>
            <View style={{ width: 15 }} />
            <View>
                <TouchableOpacity
                    onPress={() => RemoveFromFavourites()}
                    style={{ zIndex: 3 }}
                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                    <Icon2 name="favorite" size={30} color={StaticColors.yellow} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        padding: 10,
        flexDirection: 'row',
        marginBottom: 15
    },
    imageContainer: {
        backgroundColor: StaticColors.charcoal,
        height: 110,
        width: 85,
        borderRadius: 10
    },
    image: {
        height: 110,
        width: 85,
        resizeMode: 'cover'
    }
})