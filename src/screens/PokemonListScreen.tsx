import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StaticColors } from '../theme/StaticColors'
import PokemonCard from '../components/PokemonCard'
import BackBtn from '../components/BackBtn'
import { F20W900Text } from '../components/TextComponents'

export default function PokemonListScreen() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <BackBtn style={{ marginRight: 15, backgroundColor: StaticColors.charcoal }} onPress={() => { }} />
                <F20W900Text>Hello</F20W900Text>
            </View>
            <PokemonCard />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: StaticColors.background,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15
    }
})