import { gql, useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { VFC, useEffect } from 'react'
import ScreenLayout from '../components/ScreenLayout'
import { NavParamList } from '../navigators/navigators'
import {
  seeRoom,
  seeRoomVariables,
  seeRoom_seeRoom_messages,
} from '../__generated__/seeRoom'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { KeyboardAvoidingView } from 'react-native'

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`

const MessageContainer = styled.View``
const Author = styled.View``
const Avatar = styled.Image``
const Username = styled.Text`
  color: white;
`
const Message = styled.Text`
  color: white;
`
const TextInput = styled.TextInput`
  margin-bottom: 50px;
  width: 95%;
  background-color: white;
  padding: 10px 20px;
  border-radius: 1000px;
`

type RoomNavProp = StackNavigationProp<NavParamList, 'Room'>

type RoomRouteProp = RouteProp<NavParamList, 'Room'>

interface IProps {
  navigation: RoomNavProp
  route: RoomRouteProp
}

const Room: VFC<IProps> = ({ route, navigation }) => {
  const { data, loading } = useQuery<seeRoom, seeRoomVariables>(ROOM_QUERY, {
    variables: {
      id: route.params.id,
    },
  })
  useEffect(() => {
    navigation.setOptions({
      title: `${route.params.talkingTo.username}`,
    })
  }, [])
  const renderItem:
    | ListRenderItem<seeRoom_seeRoom_messages | null>
    | null
    | undefined = ({ item: message }) => (
    <MessageContainer>
      <Author>
        {message?.user.avatar && (
          <Avatar source={{ uri: message.user.avatar }} />
        )}
        <Username>{message?.user.username}</Username>
      </Author>
      <Message>{message?.payload}</Message>
    </MessageContainer>
  )

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior='height'
      keyboardVerticalOffset={100}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: '100%' }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => '' + message?.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholder='Write a message...'
          returnKeyLabel='Send Message'
          returnKeyType='send'
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  )
}

export default Room
