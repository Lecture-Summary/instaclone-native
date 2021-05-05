import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, VFC } from 'react'
import { Text, View } from 'react-native'
import useMe from '../hooks/useMe'
import { NavParamList } from '../navigators/navigators'

type MeScreenNavigationProp = StackNavigationProp<NavParamList, 'Me'>

type MeScreenRouteProp = RouteProp<NavParamList, 'Me'>

interface IProps {
  navigation: MeScreenNavigationProp
  route: MeScreenRouteProp
}

const Me: VFC<IProps> = ({ navigation, route }) => {
  const { data } = useMe()

  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    })
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
      <Text style={{ color: 'white' }}>Me</Text>
    </View>
  )
}

export default Me
