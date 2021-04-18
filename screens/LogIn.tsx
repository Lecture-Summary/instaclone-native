import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useRef, VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextInput } from 'react-native-gesture-handler'
import AuthButton from '../components/auth/AuthButton'
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

interface IForm {
  username: string
  password: string
}

const LogIn: VFC<IProps> = ({ navigation }) => {
  const { register, handleSubmit, setValue } = useForm()

  const passwordRef = useRef<TextInput>(null)

  useEffect(() => {
    register('username')
    register('password')
  }, [register])

  const onNext = (nextOne: React.RefObject<TextInput>) => {
    nextOne.current?.focus()
  }

  const onValid: SubmitHandler<IForm> = (data) => {
    console.log(data)
  }

  return (
    <AuthLayout>
      <Input
        placeholder='Username'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        autoCapitalize='none'
        returnKeyType='next'
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue('username', text)}
      />
      <Input
        ref={passwordRef}
        placeholder='Password'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        secureTextEntry
        returnKeyType='done'
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue('password', text)}
      />
      <AuthButton
        text='Log In'
        disabled={false}
        loading={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  )
}

export default LogIn
