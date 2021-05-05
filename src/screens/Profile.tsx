import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, VFC } from 'react'
import { Text, View } from 'react-native'
import { NavParamList } from '../navigators/navigators'

type ProfileScreenNavigationProp = StackNavigationProp<NavParamList, 'Profile'>

type ProfileScreenRouteProp = RouteProp<NavParamList, 'Profile'>

interface IProps {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}

const Profile: VFC<IProps> = ({ navigation, route }) => {
  useEffect(() => {
    if (route.params.username) {
      navigation.setOptions({
        title: route.params.username,
      })
    }
  }, [])

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Profile</Text>
    </View>
  )
}

export default Profile
