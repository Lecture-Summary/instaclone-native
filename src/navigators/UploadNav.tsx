import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SelectPhoto from '../screens/SelectPhoto'
import { NavParamList } from './navigators'
import TakePhoto from '../screens/TakePhoto'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createMaterialTopTabNavigator<NavParamList>()
const Stack = createStackNavigator<NavParamList>()

const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition='bottom'
      tabBarOptions={{
        style: {
          backgroundColor: 'black',
        },
        activeTintColor: 'white',
        indicatorStyle: {
          backgroundColor: 'white',
          top: 0,
        },
      }}
    >
      <Tab.Screen name='Select'>
        {() => (
          <Stack.Navigator>
            <Stack.Screen name='Select' component={SelectPhoto} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name='TakePhoto' component={TakePhoto} />
    </Tab.Navigator>
  )
}

export default UploadNav
