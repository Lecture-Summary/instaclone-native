import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import DismissKeyboard from '../components/DismissKeyboard'
import { NavParamList } from '../navigators/navigators'

const Input = styled.TextInput``

type SearchScreenNavigationProp = StackNavigationProp<NavParamList, 'Photo'>

interface IProps {
  navigation: SearchScreenNavigationProp
}

interface IForm {
  keyword: string
}

const Search: VFC<IProps> = ({ navigation }) => {
  const { setValue, register, watch } = useForm<IForm>()

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
    />
  )
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    })
    register('keyword')
  }, [])

  return (
    <DismissKeyboard>
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Search</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Photo')}>
          <Text style={{ color: 'white' }}>Photo</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  )
}

export default Search
