import { useLazyQuery } from '@apollo/client'
import { StackNavigationProp } from '@react-navigation/stack'
import gql from 'graphql-tag'
import React, { useEffect, VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ActivityIndicator, TextInput, View } from 'react-native'
import styled from 'styled-components/native'
import DismissKeyboard from '../components/DismissKeyboard'
import { NavParamList } from '../navigators/navigators'
import {
  searchPhotos,
  searchPhotosVariables,
} from '../__generated__/searchPhotos'

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`

const Input = styled.TextInput``

type SearchScreenNavigationProp = StackNavigationProp<NavParamList, 'Photo'>

interface IProps {
  navigation: SearchScreenNavigationProp
}

interface IForm {
  keyword: string
}

const Search: VFC<IProps> = ({ navigation }) => {
  const { setValue, register, handleSubmit } = useForm<IForm>()
  const [startQueryFn, { loading, data, called }] = useLazyQuery<
    searchPhotos,
    searchPhotosVariables
  >(SEARCH_PHOTOS)

  const onValid: SubmitHandler<IForm> = ({ keyword }) => {
    startQueryFn({ variables: { keyword } })
  }

  const SearchBox = () => (
    <TextInput
      style={{ backgroundColor: 'white' }}
      placeholderTextColor='black'
      placeholder='Search photos'
      autoCapitalize='none'
      returnKeyLabel='Search'
      returnKeyType='search'
      autoCorrect={false}
      onChangeText={(text) => setValue('keyword', text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  )
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    })
    register('keyword', { required: true, minLength: 3 })
  }, [])

  console.log(data)

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size='large' />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined && data.searchPhotos?.length === 0 ? (
          <MessageContainer>
            <MessageText>Could not find anything.</MessageText>
          </MessageContainer>
        ) : null}
      </View>
    </DismissKeyboard>
  )
}

export default Search
