import { StackNavigationProp } from '@react-navigation/stack'
import React, { VFC } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import AuthButton from '../components/auth/AuthButton'
import AuthLayout from '../components/auth/AuthLayout'
import { NavParamList } from '../navigators/navigators'

type WelcomeScreenNavigationProp = StackNavigationProp<NavParamList, 'Welcome'>

interface IProps {
  navigation: WelcomeScreenNavigationProp
}

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
`

const Welcome: VFC<IProps> = ({ navigation }) => {
  const goToCreateAccount = () => navigation.navigate('CreateAccount')
  const goToLogIn = () => navigation.navigate('LogIn')

  return (
    <AuthLayout>
      <AuthButton
        text='Create New Account'
        disabled={false}
        loading={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  )
}

export default Welcome
