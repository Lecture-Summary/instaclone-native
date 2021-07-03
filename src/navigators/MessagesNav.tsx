import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Room from '../screens/Room'
import Rooms from '../screens/Rooms'

const Stack = createStackNavigator()

const MessagesNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Rooms' component={Rooms} />
      <Stack.Screen name='Room' component={Room} />
    </Stack.Navigator>
  )
}

export default MessagesNav
