import { StackNavigationProp } from '@react-navigation/stack'
import React, { VFC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavParamList } from '../navigators/navigators'

type PhotoScreenNavigationProp = StackNavigationProp<NavParamList, 'Photo'>

interface IProps {
  navigation: PhotoScreenNavigationProp
}

const Photo: VFC<IProps> = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Photo</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={{ color: 'white' }}>Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Photo
