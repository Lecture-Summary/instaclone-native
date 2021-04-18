import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Feed from '../screens/Feed'
import { LoggedInNavParamList } from './navigators'
import Search from '../screens/Search'
import Notifications from '../screens/Notifications'
import Profile from '../screens/Profile'
import TabIcon from '../components/nav/TabIcon'

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
            <TabIcon iconName='home' color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName='search' color={color} focused={focused} />
          ),
        }}
      />
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
        component={Notifications}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName='heart' color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName='person' color={color} focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

export default LoggedInNav
