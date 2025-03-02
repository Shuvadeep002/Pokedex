import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { useLinkBuilder } from '@react-navigation/native';
import { DarkTheme, LightTheme, StaticColors } from '../theme/StaticColors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/themeContext';

interface CustomTabsProps extends BottomTabBarProps {
    position: Animated.AnimatedInterpolation<number>;
}

export default function CustomTabs({ state, descriptors, navigation, position }: CustomTabsProps) {
    const { buildHref } = useLinkBuilder();
    const { isDarkTheme } = useTheme()
    return (
        <View style={styles.tabBarStyle}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
                });

                return (
                    <TouchableOpacity
                        href={buildHref(route.name, route.params)}
                        accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={singleTabStyle(isFocused)}
                    >
                        <Animated.Text style={{
                            color: isFocused ?
                                `${isDarkTheme ? DarkTheme.background : LightTheme.background}` :
                                `${isDarkTheme ? DarkTheme.darkFWithOpacity(0.5) : LightTheme.darkFWithOpacity(0.5)}`,
                            fontSize: 15
                        }}>
                            {label}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const singleTabStyle = (focused: boolean): ViewStyle => ({
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: focused ? StaticColors.skyBlue : "transparent",
    paddingBottom: 10,
    marginHorizontal: 20
})
const styles = StyleSheet.create({
    tabBarStyle: {
        flexDirection: 'row',
        paddingTop: 20
    },
})