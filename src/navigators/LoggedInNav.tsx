import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { NavParamList } from './navigators'
import { createStackNavigator } from '@react-navigation/stack'
import TabsNav from './TabsNav'
import UploadNav from './UploadNav'
import UploadForm from '../screens/UploadForm'

const Stack = createStackNavigator<NavParamList>()

const LoggedInNav = () => {
  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen
        name='Tabs'
        component={TabsNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Upload'
        component={UploadNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='UploadForm'
        component={UploadForm}
        options={{
          headerBackTitleVisible: false,
          title: 'Upload',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name='close' size={28} />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export default LoggedInNav
