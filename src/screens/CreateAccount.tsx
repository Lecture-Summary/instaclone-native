import { useMutation } from '@apollo/client'
import { StackNavigationProp } from '@react-navigation/stack'
import gql from 'graphql-tag'
import React, { useEffect, useRef, VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import AuthButton from '../components/auth/AuthButton'
import AuthLayout from '../components/auth/AuthLayout'
import { Input } from '../components/auth/AuthShared'
import { LoggedOutNavParamList } from '../navigators/navigators'
import {
  createAccount,
  createAccountVariables,
} from '../__generated__/createAccount'

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $firstName: String!
    $lastName: String
    $password: String!
    $username: String!
  ) {
    createAccount(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
    ) {
      ok
      error
    }
  }
`

interface IForm {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

type CreateAccountScreenNavigationProp = StackNavigationProp<
  LoggedOutNavParamList,
  'CreateAccount'
>

interface IProps {
  navigation: CreateAccountScreenNavigationProp
}

const CreateAccount: VFC<IProps> = ({ navigation }) => {
  const { register, handleSubmit, setValue, getValues } = useForm<IForm>()

  const onCompleted = (data: createAccount) => {
    const {
      createAccount: { ok },
    } = data
    const { username, password } = getValues()
    if (ok) {
      navigation.navigate('LogIn', { username, password })
    }
  }

  const [createAccountMutation, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted })

  const lastNameRef = useRef<TextInput>(null)
  const usernameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  useEffect(() => {
    register('firstName', { required: true })
    register('lastName', { required: true })
    register('username', { required: true })
    register('email', { required: true })
    register('password', { required: true })
  }, [register])

  const onNext = (nextOne: React.RefObject<TextInput>) => {
    nextOne.current?.focus()
  }

  const onValid: SubmitHandler<IForm> = (data) => {
    if (!loading) {
      createAccountMutation({ variables: { ...data } })
    }
  }

  return (
    <AuthLayout>
      <Input
        placeholder='First Name'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        returnKeyType='next'
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue('firstName', text)}
      />
      <Input
        //@ts-ignore
        ref={lastNameRef}
        placeholder='Last Name'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        returnKeyType='next'
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue('lastName', text)}
      />
      <Input
        //@ts-ignore
        ref={usernameRef}
        placeholder='Username'
        autoCapitalize='none'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        returnKeyType='next'
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue('username', text)}
      />
      <Input
        //@ts-ignore
        ref={emailRef}
        placeholder='Email'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        keyboardType='email-address'
        returnKeyType='next'
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue('email', text)}
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
        text='Create Account'
        disabled={false}
        loading={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  )
}

export default CreateAccount
