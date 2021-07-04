import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { View } from 'react-native'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import RoomItem from '../components/rooms/RoomItem'
import ScreenLayout from '../components/ScreenLayout'
import { ROOM_FRAGMENT } from '../fragments'
import useMe from '../hooks/useMe'
import { seeRooms, seeRooms_seeRooms } from '../__generated__/seeRooms'

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`

const Rooms = () => {
  const { data, loading } = useQuery<seeRooms>(SEE_ROOMS_QUERY)

  const renderItem:
    | ListRenderItem<seeRooms_seeRooms | null>
    | null
    | undefined = ({ item: room }) => room && <RoomItem {...room} />

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        )}
        style={{ width: '100%' }}
        data={data?.seeRooms}
        keyExtractor={(room) => '' + room?.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  )
}

export default Rooms
