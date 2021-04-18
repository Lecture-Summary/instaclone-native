import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { Asset } from 'expo-asset'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import client, { isLoggedInVar } from './apollo'
import LoggedInNav from './src/navigators/LoggedInNav'
import LoggedOutNav from './src/navigators/LoggedOutNav'

export default function App() {
  const [loading, setLoading] = useState(false)
  const isLoggedIn = useReactiveVar(isLoggedInVar)

  const onFinish = () => setLoading(false)

  const preload = async () => {
    const fontsToLoad = [Ionicons.font]
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font))
    const imagesToLoad = [
      require('./assets/logo.png'),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png',
    ]
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image))
    await Promise.all([fontPromises, imagePromises])
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
