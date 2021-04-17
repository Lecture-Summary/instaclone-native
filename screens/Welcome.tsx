import { StackNavigationProp } from '@react-navigation/stack'
import React, { VFC } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { LoggedOutNavParamList } from '../navigators/navigators'

type WelcomeScreenNavigationProp = StackNavigationProp<
  LoggedOutNavParamList,
  'Welcome'
>

interface IProps {
  navigation: WelcomeScreenNavigationProp
}

const Welcome: VFC<IProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
        <View>
          <Text>Go to Log In</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Welcome
