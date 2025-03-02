import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCommonStyles } from './src/common/commonStyle'
import { StaticColors } from './src/theme/StaticColors'
import IndividualAnimePage from './src/screens/IndividualAnimePage'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/navigationStack'
import { Provider } from 'react-redux'
import { store } from './src/reduxStoreAndSlice/store'
import { ThemeContextProvider } from './src/theme/themeContext'

export default function App() {
  const commonStyle = useCommonStyles()
  return (
    <ThemeContextProvider>
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
    </ThemeContextProvider>
  )
}
