import { Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from '@react-native-community/blur';
import { StaticColors } from '../assets/StaticColors';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import { Anime, NavigationTypes } from '../common/commonTypes';
import CustomFlatList from './CustomFlatList';
import { useAppDispatch } from '../reduxStoreAndSlice/store';
import { useNavigation } from '@react-navigation/native';
import AnimeCards from './AnimeCards';
import { setIndividualAnime } from '../reduxStoreAndSlice/animeSlice';
import Icon4 from 'react-native-vector-icons/Ionicons';
import { getResponse, postResponse } from '../common/commonFunctions';
import { APIConstants } from '../assets/StaticText';

export default function SearchComponent({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: () => void }) {
    const [text, setText] = useState('')
    const [searchedItem, setSearchedItem] = useState<Anime[]>([])
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const navigation: NavigationTypes = useNavigation()

    const HandleChange = (t: string) => {
        setLoading(true)
        setText(t);
        let body = {
            query: t,
            page: "1"
        }
        postResponse(APIConstants.SEARCH, body).then((response: any) => {
            setLoading(false)
            const value = response?.data?.results as Anime[]
            setSearchedItem(value)
        }).catch(() => {
            setLoading(false)
        })
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible();
            }}>
            <BlurView
                blurType="dark"
                blurAmount={5}
                reducedTransparencyFallbackColor="white"
                style={styles.centeredView}
            >
                <ScrollView
                    nestedScrollEnabled
                    style={styles.mainContainer}>
                    <View style={styles.headerContainer}>
                        <View>
                            <TouchableOpacity onPress={() => setModalVisible()}
                                style={styles.backBtn}>
                                <Icon4 name="arrow-back" size={25} color={StaticColors.white} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textContainer}>
                            <Icon2 name="search" size={30} color={StaticColors.charcoal} />
                            <TextInput
                                multiline={false}
                                placeholder={'Search anime'}
                                style={styles.textInput}
                                value={text}
                                onChangeText={(t) => HandleChange(t)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomFlatList
                            nestedScrollEnabled
                            numColumns={2}
                            data={loading ? [1, 2, 3, 4] : searchedItem}
                            renderItem={({ item }: { item: Anime }) =>
                                <View>
                                    <AnimeCards
                                        Customwidth={Dimensions.get('window').width * 0.44}
                                        title={item?.title}
                                        url={item?.image}
                                        onPress={() => {
                                            dispatch(setIndividualAnime(item))
                                            navigation.navigate("IndividualAnimePage")
                                        }} />
                                </View>}
                        // onEndReached={() => GetAllAnimeList(page, false)}
                        // onRefreshing={() => GetAllAnimeList(1, false)}
                        />
                    </View>
                </ScrollView>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 40,
        padding: 12,
        elevation: 2,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: StaticColors.background,
        top: 10,
        right: 10,
        zIndex: 4
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    centeredView: {
        flex: 1,
        padding: 15,
    },
    textContainer: {
        zIndex: 3,
        borderWidth: 1,
        borderColor: StaticColors.charcoal,
        marginBottom: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50,
        maxHeight: 80,
        width: '85%',
        maxWidth: 400,
    },
    textInput: {
        flex: 1,
        color: StaticColors.white,
        fontSize: 17,
        maxHeight: 100,
        marginLeft: 10,
    },
    backBtn: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: StaticColors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginTop: -21,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});