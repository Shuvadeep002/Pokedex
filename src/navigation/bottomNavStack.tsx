import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Favorites from '../screens/Favorites';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import { StaticColors } from '../assets/StaticColors';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

export default function bottomNavStack() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator tabBar={(props) => <CustomBottomTab {...props} />}
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: StaticColors.background },
                headerTitleStyle: {
                    color: StaticColors.white
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
    return (
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
                            <Icon name="home" size={30} color={isFocused ? StaticColors.skyBlue : StaticColors.white} />
                            :
                            <Icon2 name="favorite-border" size={30} color={isFocused ? StaticColors.skyBlue : StaticColors.white} />
                        }
                        <Text style={{ color: isFocused ? StaticColors.skyBlue : StaticColors.white }}>
                            {label}
                        </Text>
                    </PlatformPressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        flexDirection: 'row',
        backgroundColor: StaticColors.background,
        paddingBottom: 10,
        paddingTop: 10
    },
    singleTabStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})