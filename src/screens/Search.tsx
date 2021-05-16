import { useLazyQuery } from '@apollo/client'
import { StackNavigationProp } from '@react-navigation/stack'
import gql from 'graphql-tag'
import React, { useEffect, VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import styled from 'styled-components/native'
import DismissKeyboard from '../components/DismissKeyboard'
import { NavParamList } from '../navigators/navigators'
import {
  searchPhotos,
  searchPhotosVariables,
  searchPhotos_searchPhotos,
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

const Input = styled.TextInput<{ width: number }>`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`

type SearchScreenNavigationProp = StackNavigationProp<NavParamList, 'Photo'>

interface IProps {
  navigation: SearchScreenNavigationProp
}

interface IForm {
  keyword: string
}

const Search: VFC<IProps> = ({ navigation }) => {
  const numColumns = 4
  const { width } = useWindowDimensions()
  const { setValue, register, handleSubmit } = useForm<IForm>()
  const [startQueryFn, { loading, data, called }] =
    useLazyQuery<searchPhotos, searchPhotosVariables>(SEARCH_PHOTOS)

  const onValid: SubmitHandler<IForm> = ({ keyword }) => {
    startQueryFn({ variables: { keyword } })
  }

  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor='rgba(0, 0, 0, 0.8)'
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
  const renderItem:
    | ListRenderItem<searchPhotos_searchPhotos | null>
    | null
    | undefined = ({ item: photo }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: photo?.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  )

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
        {data?.searchPhotos !== undefined ? (
          data.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data.searchPhotos}
              keyExtractor={(photo) => '' + photo?.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  )
}

export default Search
