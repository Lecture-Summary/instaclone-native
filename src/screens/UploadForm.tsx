import { RouteProp } from '@react-navigation/native'
import React, { VFC, useEffect } from 'react'
import styled from 'styled-components/native'
import { NavParamList } from '../navigators/navigators'
import DismissKeyboard from '../components/DismissKeyboard'
import { SubmitHandler, useForm } from 'react-hook-form'
import { colors } from '../../colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableOpacity, ActivityIndicator } from 'react-native'

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`

const Photo = styled.Image`
  height: 350px;
`

const CaptionContainer = styled.View`
  margin-top: 30px;
`

const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`

type UploadFormRouteProp = RouteProp<NavParamList, 'UploadForm'>

type UploadNavProp = StackNavigationProp<NavParamList, 'UploadForm'>

interface IProps {
  route: UploadFormRouteProp
  navigation: UploadNavProp
}

interface IForm {
  caption: string
}

const UploadForm: VFC<IProps> = ({ route, navigation }) => {
  const { register, handleSubmit, setValue } = useForm<IForm>()

  useEffect(() => {
    register('caption')
  }, [register])

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('UploadForm', { file: chosenPhoto })}
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  )

  const HeaderRightLoading = () => (
    <ActivityIndicator size='small' color='white' style={{ marginRight: 10 }} />
  )

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRightLoading,
      headerLeft: () => null,
    })
  }, [])

  const onValid: SubmitHandler<IForm> = ({ caption }) => {}

  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode='contain' source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            placeholder='Write a caption...'
            placeholderTextColor='rgba(0, 0, 0, 0.5)'
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue('caption', text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  )
}

export default UploadForm
