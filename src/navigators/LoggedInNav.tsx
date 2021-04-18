import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from '../screens/Feed'
import { LoggedInNavParamList } from './navigators'

const Tabs = createBottomTabNavigator<LoggedInNavParamList>()

const LoggedInNav = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Feed' component={Feed} />
    </Tabs.Navigator>
  )
}

export default LoggedInNav
