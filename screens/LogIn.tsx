import { StackNavigationProp } from '@react-navigation/stack'
import React, { VFC } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
    <View>
      <Text>LogIn</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text>Go to Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogIn
