import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DarkTheme, LightTheme, StaticColors } from '../theme/StaticColors'
import { useTheme } from '../theme/themeContext'

export default function Loader({ size, color }: { size?: number, color?: string }) {
    const { isDarkTheme } = useTheme()
    return (
        <View style={styles.main}>
            <ActivityIndicator size={size ?? 35} color={color ?? isDarkTheme ? DarkTheme.bright : LightTheme.bright} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})