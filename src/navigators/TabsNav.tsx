import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavParamList } from './navigators'
import Search from '../screens/Search'
import TabIcon from '../components/nav/TabIcon'
import StackNavFactory from './SharedStackNav'
import useMe from '../hooks/useMe'
import { Image, View } from 'react-native'

const Tabs = createBottomTabNavigator<NavParamList>()

const TabsNav = () => {
  const { data } = useMe()

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
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate('Upload')
          },
        })}
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
          tabBarIcon: ({ color, focused }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data.me.avatar }}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  ...(focused && { borderColor: 'white', borderWidth: 1 }),
                }}
              />
            ) : (
              <TabIcon iconName='person' color={color} focused={focused} />
            ),
        }}
      >
        {() => <StackNavFactory screenName='Me' />}
      </Tabs.Screen>
    </Tabs.Navigator>
  )
}

export default TabsNav
