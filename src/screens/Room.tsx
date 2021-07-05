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

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`

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

const MessageContainer = styled.View<{ outGoing?: boolean }>`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? 'row-reverse' : 'row')};
  align-items: flex-end;
`
const Author = styled.View``
const Avatar = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 10px;
`
const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 10px;
`
const TextInput = styled.TextInput`
  margin-bottom: 50px;
  margin-top: 25px;
  width: 95%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 1000px;
  color: white;
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
    <MessageContainer
      outGoing={message?.user.username !== route.params.talkingTo}
    >
      <Author>
        {message?.user.avatar && (
          <Avatar source={{ uri: message.user.avatar }} />
        )}
      </Author>
      <Message>{message?.payload}</Message>
    </MessageContainer>
  )

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior='padding'
      keyboardVerticalOffset={50}
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
          placeholderTextColor='rgba(255, 255, 255, 0.5)'
          placeholder='Write a message...'
          returnKeyLabel='Send Message'
          returnKeyType='send'
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  )
}

export default Room
