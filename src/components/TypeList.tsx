import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StaticColors } from '../assets/StaticColors'
import { NavigationTypes } from '../common/commonTypes';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import TypeListItem from './TypeListItem';

export default function TypeList({ data }: { data: Array<any> }) {
    const colors = ["#A6F1E0", "#16C47F", "#577BC1", "#FFEB00", "#FB9EC6"];
    const navigation: NavigationTypes = useNavigation();

    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={data}
                renderItem={({ item, index }) =>
                    <TypeListItem
                        backgroundColor={colors[index % colors.length]}
                        index={index}
                        item={item}
                        onPress={() => { }}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({

})