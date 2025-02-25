import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AnimeCards from './AnimeCards'
import { commonStyle } from '../common/commonStyle'
import { Anime, NavigationTypes } from '../common/commonTypes'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../reduxStoreAndSlice/store'
import { setIndividualAnime } from '../reduxStoreAndSlice/animeSlice'

export default function AnimeListComponent({ data, title, onPress }: { data?: any, title: string, onPress: () => void }) {
    const staticData = [1, 2, 3, 4, 5]
    const navigation: NavigationTypes = useNavigation()
    const dispatch = useAppDispatch()

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <Text style={commonStyle.f20W900Text}>{title}</Text>
                {data?.length > 0 &&
                    <TouchableOpacity onPress={onPress} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                        <Text style={commonStyle.f15W500Text}>See all</Text>
                    </TouchableOpacity>}
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data?.length > 0 ? data : staticData}
                renderItem={({ item, index }: { item: Anime, index: number }) =>
                    <AnimeCards
                        onPress={() => {
                            dispatch(setIndividualAnime(item))
                            navigation.navigate("IndividualAnimePage")
                        }}
                        url={item.image}
                        title={item?.title} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingRight: 10
    }
})