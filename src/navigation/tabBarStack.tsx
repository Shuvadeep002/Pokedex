import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import Favorites from '../screens/Favorites';
import { useLinkBuilder } from '@react-navigation/native';
import { StaticColors } from '../assets/StaticColors';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();
export default function tabBarStack() {
    return (
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favorites" component={Favorites} />
        </Tab.Navigator>
    )
}

function MyTabBar({ state, descriptors, navigation, position }) {
    const { buildHref } = useLinkBuilder();

    return (
        <View style={styles.tabBarStyle}>
            {state.routes.map((route, index) => {
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
                        {index == 0 ?
                            <Icon name="home" size={30} color={isFocused ? StaticColors.skyBlue : StaticColors.white} />
                            :
                            <Icon2 name="favorite-border" size={30} color={isFocused ? StaticColors.skyBlue : StaticColors.white} />
                        }
                        <View style={{ width: 5 }} />
                        <Animated.Text style={{ color: isFocused ? "#148EFF" : StaticColors.white, fontSize: 20 }}>
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
    borderBottomColor: focused ? StaticColors.skyBlue : StaticColors.background,
    paddingBottom: 10,
    marginHorizontal: 20
})
const styles = StyleSheet.create({
    tabBarStyle: {
        flexDirection: 'row',
        backgroundColor: StaticColors.background,
        paddingBottom: 10,
        paddingTop: 10
    },

})