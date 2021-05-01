import { useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import gql from 'graphql-tag'
import React, { useState, VFC } from 'react'
import { FlatList, ListRenderItem, Text, View } from 'react-native'
import ScreenLayout from '../components/ScreenLayout'
import UserRow from '../components/UserRow'
import { USER_FRAGMENT } from '../fragments'
import { NavParamList } from '../navigators/navigators'
import {
  seePhotoLikes,
  seePhotoLikesVariables,
  seePhotoLikes_seePhotoLikes,
} from '../__generated__/seePhotoLikes'

type LikesScreenNavigationProp = StackNavigationProp<NavParamList, 'Likes'>

type LikesScreenRouteProp = RouteProp<NavParamList, 'Likes'>

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`

interface IProps {
  navigation: LikesScreenNavigationProp
  route: LikesScreenRouteProp
}

const Likes: VFC<IProps> = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false)

  const { data, loading, refetch } = useQuery<
    seePhotoLikes,
    seePhotoLikesVariables
  >(LIKES_QUERY, {
    variables: { id: +route?.params?.photoId },
    skip: !route?.params?.photoId,
  })

  const renderUser:
    | ListRenderItem<seePhotoLikes_seePhotoLikes | null>
    | null
    | undefined = ({ item: user }) => user && <UserRow {...user} />

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={{ width: '100%' }}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => '' + item?.id}
        renderItem={renderUser}
      />
    </ScreenLayout>
  )
}

export default Likes
