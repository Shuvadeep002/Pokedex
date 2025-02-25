import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StaticColors } from '../assets/StaticColors'

export default function Loader({ size, color }: { size?: number, color?: string }) {
    return (
        <View style={styles.main}>
            <ActivityIndicator size={size ?? 35} color={color ?? StaticColors.white} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})