import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import bottomNavStack from './bottomNavStack';
import { StaticColors } from '../theme/StaticColors';
import { APIConstants } from '../assets/StaticText';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetails from '../screens/PokemonDetails/PokemonDetails';

export default function StackNavigator() {
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="BottomNav" component={bottomNavStack} />
            <Stack.Screen name="PokemonListScreen" component={PokemonListScreen} />
            <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
            
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})