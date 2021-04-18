import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Feed from '../screens/Feed'
import { LoggedInNavParamList } from './navigators'
import Search from '../screens/Search'
import Notifications from '../screens/Notifications'
import Profile from '../screens/Profile'

const Tabs = createBottomTabNavigator<LoggedInNavParamList>()

const LoggedInNav = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        showLabel: false,
        style: {
          borderTopColor: 'rgba(255, 255, 255, 0.2)',
          backgroundColor: 'black',
        },
      }}
    >
      <Tabs.Screen
        name='Feed'
        component={Feed}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name='home' color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name='search' color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name='Notifications'
        component={Notifications}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name='heart' color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name='person' color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

export default LoggedInNav
