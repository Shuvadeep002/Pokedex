import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyle } from './src/common/commonStyle'
import { StaticColors } from './src/assets/StaticColors'
import IndividualAnimePage from './src/screens/IndividualAnimePage'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/navigationStack'
import { Provider } from 'react-redux'
import { store } from './src/reduxStoreAndSlice/store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={commonStyle.mainContainer}>
          <StatusBar backgroundColor={StaticColors.background}
            barStyle={'light-content'}
          />
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  )
}
