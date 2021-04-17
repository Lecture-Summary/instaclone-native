import React, { useRef } from 'react'
import { TextInput, TextInputComponent } from 'react-native'
import styled from 'styled-components/native'
import Authbutton from '../components/auth/Authbutton'
import AuthLayout from '../components/auth/AuthLayout'

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
      <TextInput
        placeholder='First Name'
        placeholderTextColor='gray'
        returnKeyType='next'
        style={{ backgroundColor: 'white', width: '100%' }}
        onSubmitEditing={() => onNext(lastNameRef)}
      />
      <TextInput
        ref={lastNameRef}
        placeholder='Last Name'
        placeholderTextColor='gray'
        returnKeyType='next'
        style={{ backgroundColor: 'white', width: '100%' }}
        onSubmitEditing={() => onNext(usernameRef)}
      />
      <TextInput
        ref={usernameRef}
        placeholder='Username'
        placeholderTextColor='gray'
        returnKeyType='next'
        style={{ backgroundColor: 'white', width: '100%' }}
        onSubmitEditing={() => onNext(emailRef)}
      />
      <TextInput
        ref={emailRef}
        placeholder='Email'
        placeholderTextColor='gray'
        keyboardType='email-address'
        returnKeyType='next'
        style={{ backgroundColor: 'white', width: '100%' }}
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <TextInput
        ref={passwordRef}
        placeholder='Password'
        placeholderTextColor='gray'
        secureTextEntry
        returnKeyType='done'
        style={{ backgroundColor: 'white', width: '100%' }}
        onSubmitEditing={onDone}
      />
      <Authbutton text='Create Account' disabled={true} onPress={() => null} />
    </AuthLayout>
  )
}

export default CreateAccount
