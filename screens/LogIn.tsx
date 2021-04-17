import { StackNavigationProp } from '@react-navigation/stack'
import React, { VFC } from 'react'
import { Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import AuthLayout from '../components/auth/AuthLayout'
import { Input } from '../components/auth/AuthShared'
import { LoggedOutNavParamList } from '../navigators/navigators'

type LogInScreenNavigationProp = StackNavigationProp<
  LoggedOutNavParamList,
  'LogIn'
>

interface IProps {
  navigation: LogInScreenNavigationProp
}

const LogIn: VFC<IProps> = ({ navigation }) => {
  return (
    <AuthLayout>
      <Input
        placeholder='Username'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        returnKeyType='next'
      />
      <Input
        placeholder='Password'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        secureTextEntry
        returnKeyType='done'
        lastOne={true}
      />
    </AuthLayout>
  )
}

export default LogIn
