import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { useCommonStyles } from '../common/commonStyle'

interface textInterface {
    children?: any,
    style?: any
}

export function F20W900Text({ children, style }: textInterface) {
    const commonStyle = useCommonStyles()

    return (
        <Text style={[commonStyle.f20W900Text, style]}>{children}</Text>
    )
}
export function F10W900Text({ children, style }: textInterface) {
    const commonStyle = useCommonStyles()

    return (
        <Text style={[commonStyle.f10W900Text, style]}>{children}</Text>
    )
}
export function F15W900Text({ children, style }: textInterface) {
    const commonStyle = useCommonStyles()

    return (
        <Text style={[commonStyle.f15W900Text, style]}>{children}</Text>
    )
}
export function F15W500Text({ children, style }: textInterface) {
    const commonStyle = useCommonStyles()

    return (
        <Text style={[commonStyle.f15W500Text, style]}>{children}</Text>
    )
}
export function F30W900Text({ children, style }: textInterface) {
    const commonStyle = useCommonStyles()

    return (
        <Text style={[commonStyle.f30W900Text, style]}>{children}</Text>
    )
}
export function F35W900Text({ children, style }: textInterface) {
    const commonStyle = useCommonStyles()

    return (
        <Text style={[commonStyle.f35W900Text, style]}>{children}</Text>
    )
}
export function F40W900Text({ children, style }: textInterface) {
    const commonStyle = useCommonStyles()

    return (
        <Text style={[commonStyle.f40W900Text, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({})