import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Photo = ({ navigation }) => {
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
