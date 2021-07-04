import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import Room from '../screens/Room'
import Rooms from '../screens/Rooms'

const Stack = createStackNavigator()

const MessagesNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerBackImage: ({ tintColor }) => (
          <Ionicons name='chevron-down' color={tintColor} size={28} />
        ),
      }}
    >
      <Stack.Screen name='Rooms' component={Rooms} />
      <Stack.Screen name='Room' component={Room} />
    </Stack.Navigator>
  )
}

export default MessagesNav
