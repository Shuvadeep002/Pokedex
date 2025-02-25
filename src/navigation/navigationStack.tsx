import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import bottomNavStack from './bottomNavStack';
import IndividualAnimePage from '../screens/IndividualAnimePage';
import AllAnimeScreen from '../screens/AllAnimeScreen';
import { StaticColors } from '../assets/StaticColors';
import { APIConstants } from '../assets/StaticText';
import tabBarStack from './tabBarStack';

export default function StackNavigator() {
    const Stack = createNativeStackNavigator();
    const GetHeaderName = (route: any) => {
        switch (route.params?.screen) {
            case APIConstants.MOST_POPULAR: {
                return "Most popular"
            }
            case APIConstants.MOST_FAVORITE: {
                return "Most favourite"
            }
            case APIConstants.LATEST_COMPLETED: {
                return "Latest completed";
            }
            case APIConstants.RECENTLY_ADDED: {
                return "Recently added"
            }
            case APIConstants.RECENTLY_UPDATED: {
                return "Recently updated";
            }
            case APIConstants.TOP_AIRING: {
                return "Top airing"
            }
            default: {
                return "All anime"
            }
        }
    }
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="BottomNav" component={bottomNavStack} />
            <Stack.Screen name="TabNav" component={tabBarStack} />
            <Stack.Screen name="IndividualAnimePage" component={IndividualAnimePage} />
            <Stack.Screen options={({ route }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: StaticColors.background },
                headerTintColor: 'white',
                headerTitle: GetHeaderName(route),
            })}
                name="AllAnimeScreen" component={AllAnimeScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})