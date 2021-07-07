import {
  ApolloCache,
  FetchResult,
  gql,
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client'
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
import { FlatList, ListRenderItem, View } from 'react-native'
import styled from 'styled-components/native'
import { KeyboardAvoidingView } from 'react-native'
import { SubmitHandler, useForm } from 'react-hook-form'
import { sendMessage, sendMessageVariables } from '../__generated__/sendMessage'
import useMe from '../hooks/useMe'
import { Ionicons } from '@expo/vector-icons'
import { roomUpdates, roomUpdatesVariables } from '../__generated__/roomUpdates'
import { UpdateQueryFn } from '@apollo/client/core/watchQueryOptions'

const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        username
        avatar
      }
      read
    }
  }
`

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
      id
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
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 1000px;
  color: white;
  width: 90%;
  margin-right: 10px;
`
const InputContainer = styled.View`
  width: 95%;
  margin-bottom: 50px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`
const SendButton = styled.TouchableOpacity``

type RoomNavProp = StackNavigationProp<NavParamList, 'Room'>

type RoomRouteProp = RouteProp<NavParamList, 'Room'>

interface IProps {
  navigation: RoomNavProp
  route: RoomRouteProp
}

interface IForm {
  message: string
}

const Room: VFC<IProps> = ({ route, navigation }) => {
  const { data: meData } = useMe()
  const { register, setValue, handleSubmit, getValues, watch } =
    useForm<IForm>()
  const updateSendMessage = (
    cache: ApolloCache<any>,
    result: FetchResult<any>
  ) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result
    if (ok && meData) {
      const { message } = getValues()
      setValue('message', '')
      const messageObj = {
        id,
        payload: message,
        user: {
          username: meData.me?.username,
          avatar: meData.me?.avatar,
        },
        read: true,
        __typename: 'Message',
      }
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: messageObj,
      })
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment]
          },
        },
      })
    }
  }
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation<
    sendMessage,
    sendMessageVariables
  >(SEND_MESSAGE_MUTATION, {
    // update: updateSendMessage,
  })
  const { data, loading, subscribeToMore } = useQuery<
    seeRoom,
    seeRoomVariables
  >(ROOM_QUERY, {
    variables: {
      id: route.params.id,
    },
  })
  const client = useApolloClient()
  const updateQuery: UpdateQueryFn<void, { id: number }, roomUpdates> = (
    prevQuery,
    options
  ) => {
    const {
      subscriptionData: {
        data: { roomUpdates: message },
      },
    } = options
    if (message?.id) {
      const incomingMessage = client.cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: message,
      })
      client.cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            console.log('prev: ', prev)
            console.log('incoming: ', incomingMessage)
            const existingMessage = prev.find(
              (aMessage) => aMessage.__ref === incomingMessage?.__ref
            )
            console.log('existingMessage: ', existingMessage)
            if (existingMessage) {
              console.log('exists!')
              return prev
            }
            return [...prev, incomingMessage]
          },
        },
      })
    }
  }
  useEffect(() => {
    if (data?.seeRoom) {
      subscribeToMore({
        document: ROOM_UPDATES,
        variables: {
          id: route.params.id,
        },
        updateQuery,
      })
    }
  }, [data])
  const onValid: SubmitHandler<IForm> = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: { payload: message, roomId: route.params.id },
      })
    }
  }
  useEffect(() => {
    register('message', { required: true })
  }, [])
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
      outGoing={message?.user.username !== route.params.talkingTo.username}
    >
      <Author>
        {message?.user.avatar && (
          <Avatar source={{ uri: message.user.avatar }} />
        )}
      </Author>
      <Message>{message?.payload}</Message>
    </MessageContainer>
  )
  const messages = [...(data?.seeRoom?.messages ?? [])]
  messages.reverse()
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior='padding'
      keyboardVerticalOffset={50}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          style={{ width: '100%', marginVertical: 10 }}
          inverted
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          data={messages}
          showsVerticalScrollIndicator={false}
          keyExtractor={(message) => '' + message?.id}
          renderItem={renderItem}
        />
        <InputContainer>
          <TextInput
            placeholderTextColor='rgba(255, 255, 255, 0.5)'
            placeholder='Write a message...'
            returnKeyLabel='Send Message'
            returnKeyType='send'
            onChangeText={(text) => setValue('message', text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch('message')}
          />
          <SendButton disabled={!Boolean(watch('message'))}>
            <Ionicons
              name='send'
              color={
                !Boolean(watch('message'))
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'white'
              }
              size={22}
              onPress={handleSubmit(onValid)}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  )
}

export default Room
