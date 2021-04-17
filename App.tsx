import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

export default function App() {
  const [loading, setLoading] = useState(false)
  const onFinish = () => setLoading(false)
  const preload = async () => {
    const fontsToLoad = [Ionicons.font]
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font))
    await Promise.all(fontPromises)
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
    <View style={styles.container}>
      <Text>hi</Text>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
