import { StackNavigationProp } from '@react-navigation/stack'
import React, { VFC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavParamList } from '../navigators/navigators'

type SearchScreenNavigationProp = StackNavigationProp<NavParamList, 'Photo'>

interface IProps {
  navigation: SearchScreenNavigationProp
}

const Search: VFC<IProps> = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Search</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Photo')}>
        <Text style={{ color: 'white' }}>Photo</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Search
