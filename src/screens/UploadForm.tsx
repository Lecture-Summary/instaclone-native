import { RouteProp } from '@react-navigation/native'
import { ReactNativeFile } from 'apollo-upload-client'
import React, { VFC, useEffect } from 'react'
import styled from 'styled-components/native'
import { NavParamList } from '../navigators/navigators'
import DismissKeyboard from '../components/DismissKeyboard'
import { SubmitHandler, useForm } from 'react-hook-form'
import { colors } from '../../colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import { ApolloCache, FetchResult, gql, useMutation } from '@apollo/client'
import { FEED_PHOTO } from '../fragments'
import { uploadPhoto, uploadPhotoVariables } from '../__generated__/uploadPhoto'

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`

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
  const updateUploadPhoto = (
    cache: ApolloCache<any>,
    result: FetchResult<any>
  ) => {
    const {
      data: { uploadPhoto },
    } = result
    if (uploadPhoto.id) {
      cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev]
          },
        },
      })
      navigation.navigate('Tabs')
    }
  }

  const [uploadPhotoMutation, { loading }] = useMutation<
    uploadPhoto,
    uploadPhotoVariables
  >(UPLOAD_PHOTO_MUTATION, {
    update: updateUploadPhoto,
  })

  const { register, handleSubmit, setValue } = useForm<IForm>()

  useEffect(() => {
    register('caption')
  }, [register])

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  )

  const HeaderRightLoading = () => (
    <ActivityIndicator size='small' color='white' style={{ marginRight: 10 }} />
  )

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    })
  }, [loading])

  const onValid: SubmitHandler<IForm> = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpeg`,
      type: 'image/jpeg',
    })
    uploadPhotoMutation({ variables: { caption, file } })
  }

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
