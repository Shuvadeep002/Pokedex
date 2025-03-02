import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import Icon4 from 'react-native-vector-icons/Ionicons';
import { DarkTheme, LightTheme, StaticColors } from '../theme/StaticColors';
import { useTheme } from '../theme/themeContext';

export default function BackBtn({ onPress, style, arrowColor }: {
    onPress: () => void,
    style?: ViewStyle,
    arrowColor?: string
}) {
    const { isDarkTheme } = useTheme()
    return (
        <View>
            <TouchableOpacity onPress={onPress}
                style={[backBtn(isDarkTheme), style]}>
                <Icon4 name="arrow-back" size={25} color={isDarkTheme ? DarkTheme.background : LightTheme.background} />
            </TouchableOpacity>
        </View>
    )
}

const backBtn = (darkMode: boolean): ViewStyle => ({
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: darkMode ? DarkTheme.bright : LightTheme.bright,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
})
const styles = StyleSheet.create({

})