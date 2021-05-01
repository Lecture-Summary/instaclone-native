import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { Asset } from 'expo-asset'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import client, { cache, isLoggedInVar, tokenVar } from './apollo'
import LoggedInNav from './src/navigators/LoggedInNav'
import LoggedOutNav from './src/navigators/LoggedOutNav'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistCache, AsyncStorageWrapper } from 'apollo3-cache-persist'

export default function App() {
  const [loading, setLoading] = useState(true)
  const isLoggedIn = useReactiveVar(isLoggedInVar)

  const onFinish = () => setLoading(false)

  const preloadAssets = async () => {
    const fontsToLoad = [Ionicons.font]
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font))
    const imagesToLoad = [require('./assets/logo.png')]
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image))
    await Promise.all([fontPromises, imagePromises])
  }

  const preload = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      isLoggedInVar(true)
      tokenVar(token)
    }
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
      serialize: false,
    })
    return preloadAssets()
  }

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    )
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  )
}
