import { gql, useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { VFC } from 'react'
import { useEffect } from 'react'
import { NavParamList } from '../navigators/navigators'
import { seeRoom, seeRoomVariables } from '../__generated__/seeRoom'

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

type RoomNavProp = StackNavigationProp<NavParamList, 'Room'>

type RoomRouteProp = RouteProp<NavParamList, 'Room'>

interface IProps {
  navigation: RoomNavProp
  route: RoomRouteProp
}

const Room: VFC<IProps> = ({ route, navigation }) => {
  const { data } = useQuery<seeRoom, seeRoomVariables>(ROOM_QUERY, {
    variables: {
      id: route.params.id,
    },
  })
  useEffect(() => {
    navigation.setOptions({
      title: `${route.params.talkingTo.username}`,
    })
  }, [])
  return <></>
}

export default Room
