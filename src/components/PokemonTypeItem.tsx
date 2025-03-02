import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { F15W900Text } from './TextComponents'
import { getPokemonName } from '../common/commonFunctions'
import { DarkTheme, LightTheme, StaticColors } from '../theme/StaticColors'
import { useTheme } from '../theme/themeContext'

export default function PokemonTypeItem({ name, style, returnNumber, StyleText }:
    { name: string, style?: ViewStyle, returnNumber?: boolean, StyleText?: TextStyle }) {
    const { isDarkTheme } = useTheme()
    return (
        <View style={[typeContainer(isDarkTheme), style]}>
            <F15W900Text style={[{ fontWeight: '400' }, StyleText]}>{returnNumber ? name : getPokemonName(name)}</F15W900Text>
        </View>
    )
}

const typeContainer = (darkMode: boolean): ViewStyle => ({
    backgroundColor: darkMode ? DarkTheme.darkFWithOpacity(0.5) : LightTheme.darkFWithOpacity(0.5),
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 5,
    borderRadius: 30,
    alignItems: 'center'
})
const styles = StyleSheet.create({

})