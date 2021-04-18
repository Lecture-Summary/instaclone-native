import { useMutation } from '@apollo/client'
import { StackNavigationProp } from '@react-navigation/stack'
import gql from 'graphql-tag'
import React, { useEffect, useRef, VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextInput } from 'react-native-gesture-handler'
import { isLoggedInVar } from '../../apollo'
import AuthButton from '../components/auth/AuthButton'
import AuthLayout from '../components/auth/AuthLayout'
import { Input } from '../components/auth/AuthShared'
import { LoggedOutNavParamList } from '../navigators/navigators'
import { login, loginVariables } from '../__generated__/login'

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`

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
  const { register, handleSubmit, setValue, watch } = useForm()

  const passwordRef = useRef<TextInput>(null)

  const onCompleted = (data: login) => {
    const {
      login: { ok, token },
    } = data
    if (ok) {
      isLoggedInVar(true)
    }
  }

  const [logInMutation, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    { onCompleted }
  )

  useEffect(() => {
    register('username')
    register('password')
  }, [register])

  const onNext = (nextOne: React.RefObject<TextInput>) => {
    //@ts-ignore
    nextOne.current?.focus()
  }

  const onValid: SubmitHandler<IForm> = (data) => {
    if (!loading) {
      logInMutation({ variables: { ...data } })
    }
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
        //@ts-ignore
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
        disabled={!watch('username') || !watch('password')}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  )
}

export default LogIn
