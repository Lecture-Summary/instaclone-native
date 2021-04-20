import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Feed from '../screens/Feed'
import { LoggedInNavParamList } from './navigators'
import Search from '../screens/Search'
import Notifications from '../screens/Notifications'
import Profile from '../screens/Profile'
import TabIcon from '../components/nav/TabIcon'
import Me from '../screens/Me'
import StackNavFactory from '../components/nav/StackNavFactory'

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
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName='home' color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName='Feed' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='Search'
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName='search' color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName='Search' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='Camera'
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName='camera' color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='Notifications'
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName='heart' color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName='Notifications' />}
      </Tabs.Screen>
      <Tabs.Screen
        name='Me'
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName='person' color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName='Me' />}
      </Tabs.Screen>
    </Tabs.Navigator>
  )
}

export default LoggedInNav
