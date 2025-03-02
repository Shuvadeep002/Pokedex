import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Favorites from '../screens/Favorites';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import { DarkTheme, LightTheme, StaticColors } from '../theme/StaticColors';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { StaticText } from '../assets/StaticText';
import NetInfo, { addEventListener } from "@react-native-community/netinfo"
import { useTheme } from '../theme/themeContext';
export default function bottomNavStack() {
    const { isDarkTheme } = useTheme()
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator tabBar={(props) => <CustomBottomTab {...props} />}
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: isDarkTheme ? DarkTheme.background : LightTheme.background },
                headerTitleStyle: {
                    color: isDarkTheme ? DarkTheme.bright : LightTheme.bright
                }
            }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen options={{ headerShown: true }}
                name="Favorites" component={Favorites} />
        </Tab.Navigator>
    )
}

function CustomBottomTab({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) {
    const { buildHref } = useLinkBuilder();
    const [isConnect, setConnected] = useState(false)
    useEffect(() => {
        const unsubscribe = addEventListener(state => {
            setConnected(state.isConnected ? true : false)
        });
        return () => unsubscribe()
    }, [])
    return (
        <View>
            <View style={styles.tabBarStyle}>
                {state.routes.map((route: { key: number, name: string, params: any }, index: number) => {
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

                    return (
                        <PlatformPressable
                            href={buildHref(route.name, route.params)}
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarButtonTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.singleTabStyle}
                        >
                            {index == 0 ?
                                <Icon name="home" size={30} color={isFocused ? StaticColors.skyBlue : StaticColors.bright} />
                                :
                                <Icon2 name="favorite-border" size={30} color={isFocused ? StaticColors.skyBlue : StaticColors.bright} />
                            }
                            <Text style={{ color: isFocused ? StaticColors.skyBlue : StaticColors.bright }}>
                                {label}
                            </Text>
                        </PlatformPressable>
                    );
                })}
            </View>
            {!isConnect &&
                <View style={styles.noConnectionContainer}>
                    <Text style={styles.noConnectionText}>{StaticText.NoConnection}</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        flexDirection: 'row',
        backgroundColor: StaticColors.background,
        paddingVertical: 10,
        // paddingTop: 10
    },
    singleTabStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    noConnectionContainer: {
        backgroundColor: StaticColors.red,
        zIndex: 5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noConnectionText: {
        fontSize: 15,
        marginHorizontal: 10,
        color: StaticColors.bright
    }

})