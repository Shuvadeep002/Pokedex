import { Dimensions, Image, ImageStyle, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { StaticColors } from '../assets/StaticColors'
import { commonStyle } from '../common/commonStyle'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch } from '../reduxStoreAndSlice/store'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const { height, width } = Dimensions.get('window')

export default function AnimeCards({ url, title, onPress, Customwidth }: { url?: string, title?: string, onPress: () => void, Customwidth?: number }) {
    const [loading, setLoading] = useState(true)
    return (
        <TouchableOpacity onPress={onPress} style={{ width: Customwidth ?? width * 0.45, marginRight: 15, minHeight: width * 0.45 }}>
            <View style={main(Customwidth)}>
                {((url?.length ?? 0) <= 0 || url == undefined) ? <ShimmerPlaceholder style={main(Customwidth)} /> :
                    loading && (
                        <ShimmerPlaceholder style={main(Customwidth)} />
                    )}
                <Image
                    style={imageStyle(loading)}
                    source={{ uri: url }}
                    onLoadStart={() => setLoading(true)}
                    onLoad={() => setLoading(false)}
                />
            </View>
            {(title?.length ?? 0) > 0 &&
                <View style={textContainer(Customwidth)}>
                    <Text numberOfLines={2} style={commonStyle.f15W500Text}>{title}</Text>
                </View>}
        </TouchableOpacity>
    )
}

const imageStyle = (isLoading: boolean, Customwidth?: number): ImageStyle => ({
    height: width * 0.3,
    width: Customwidth ?? width * 0.45,
    borderRadius: 10,
    resizeMode: 'cover',
    opacity: isLoading ? 0 : 1,
})
const main = (Customwidth?: number): ViewStyle => ({
    height: width * 0.3,
    width: Customwidth ?? width * 0.45,
    borderRadius: 10,
    backgroundColor: StaticColors.charcoal,
    overflow: 'hidden',
    position: 'relative'
})
const textContainer = (Customwidth?: number): ViewStyle => ({
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    minHeight: 10,
    width: Customwidth ?? width * 0.45,
    // flexDirection: 'row',
    // alignItems: 'center'
})
const styles = StyleSheet.create({

})

