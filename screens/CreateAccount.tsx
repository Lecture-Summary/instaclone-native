import React, { useRef } from 'react'
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import Authbutton from '../components/auth/Authbutton'
import AuthLayout from '../components/auth/AuthLayout'
import { Input } from '../components/auth/AuthShared'

const CreateAccount = () => {
  const lastNameRef = useRef<TextInput>(null)
  const usernameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const onNext = (nextOne: React.RefObject<TextInput>) => {
    nextOne.current?.focus()
  }
  const onDone = () => {
    alert('done!')
  }

  return (
    <AuthLayout>
      <Input
        placeholder='First Name'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        returnKeyType='next'
        onSubmitEditing={() => onNext(lastNameRef)}
      />
      <Input
        ref={lastNameRef}
        placeholder='Last Name'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        returnKeyType='next'
        onSubmitEditing={() => onNext(usernameRef)}
      />
      <Input
        ref={usernameRef}
        placeholder='Username'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        returnKeyType='next'
        onSubmitEditing={() => onNext(emailRef)}
      />
      <Input
        ref={emailRef}
        placeholder='Email'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        keyboardType='email-address'
        returnKeyType='next'
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <Input
        ref={passwordRef}
        placeholder='Password'
        placeholderTextColor='rgba(255, 255, 255, 0.8)'
        secureTextEntry
        returnKeyType='done'
        lastOne={true}
        onSubmitEditing={onDone}
      />
      <Authbutton text='Create Account' disabled={true} onPress={() => null} />
    </AuthLayout>
  )
}

export default CreateAccount
