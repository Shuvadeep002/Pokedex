import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { StaticColors } from '../assets/StaticColors'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, Easing } from 'react-native-reanimated';
import { NavigationTypes } from '../common/commonTypes';
import { useNavigation } from '@react-navigation/native';


const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function TypeListItem(
    { backgroundColor, index, item, onPress }: {
        backgroundColor: string,
        index: number,
        item: any,
        onPress: () => void
    }) {
    const translateY = useSharedValue(-60);
    const opacity = useSharedValue(0);
    const navigation: NavigationTypes = useNavigation();

    useEffect(() => {
        const focusListener = navigation.addListener('focus', async () => {
            translateY.value = withDelay(
                index * 200,
                withTiming(0, {
                    duration: 1200,
                    easing: Easing.out(Easing.exp),
                })
            );

            opacity.value = withDelay(
                index * 200,
                withTiming(1, {
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                })
            );
        });
        return () => {
            if (focusListener && typeof focusListener.remove === 'function') {
                focusListener.remove();
            } else if (focusListener && typeof focusListener === 'function') {
                focusListener();
            }
        };

    }, [index])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    return (
        <AnimatedTouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
            style={[styles.itemContainer, animatedStyle, { backgroundColor: backgroundColor }]}>
            <Text numberOfLines={1} style={styles.itemText}>{`${item?.name[0]?.toUpperCase()}${item?.name?.slice(1)}`}</Text>
            <Image style={styles.pokeball} source={require('../assets/Images/Pokeball.png')} />
        </AnimatedTouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemText: {
        flex: 1,
        marginHorizontal: 15,
        fontSize: 16,
        color: StaticColors.background,
        fontWeight: "600"
    },
    itemContainer: {
        backgroundColor: "#A6F1E0",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        borderRadius: 15,
        overflow: 'hidden',
        width: '45%',
        margin: 10,
    },
    pokeball: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        opacity: 0.5,
        bottom: -10,
        right: -10
    },
})