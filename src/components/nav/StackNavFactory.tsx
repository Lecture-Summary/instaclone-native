import { createStackNavigator } from '@react-navigation/stack'
import React, { VFC } from 'react'
import Feed from '../../screens/Feed'
import Me from '../../screens/Me'
import Notifications from '../../screens/Notifications'
import Photo from '../../screens/Photo'
import Profile from '../../screens/Profile'
import Search from '../../screens/Search'

const Stack = createStackNavigator()

interface IProps {
  screenName: string
}

const StackNavFactory: VFC<IProps> = ({ screenName }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          shadowColor: 'rgba(255, 255, 255, 0.2)',
        },
      }}
    >
      {screenName === 'Feed' ? (
        <Stack.Screen name='Feed' component={Feed} />
      ) : null}
      {screenName === 'Search' ? (
        <Stack.Screen name='Search' component={Search} />
      ) : null}
      {screenName === 'Notifications' ? (
        <Stack.Screen name='Notifications' component={Notifications} />
      ) : null}
      {screenName === 'Me' ? <Stack.Screen name='Me' component={Me} /> : null}
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Photo' component={Photo} />
    </Stack.Navigator>
  )
}

export default StackNavFactory
