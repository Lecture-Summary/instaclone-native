import { gql, useQuery } from '@apollo/client'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState, VFC, useEffect } from 'react'
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native'
import Photo from '../components/Photo'
import ScreenLayout from '../components/ScreenLayout'
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments'
import { NavParamList } from '../navigators/navigators'
import { seeFeed, seeFeed_seeFeed } from '../__generated__/seeFeed'
import { Ionicons } from '@expo/vector-icons'

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`

type FeedNavProp = StackNavigationProp<NavParamList, 'Feed'>

interface IProps {
  navigation: FeedNavProp
}

const Feed: VFC<IProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const { data, loading, refetch, fetchMore } = useQuery<seeFeed>(FEED_QUERY, {
    variables: { offset: 0 },
  })

  const renderPhoto: ListRenderItem<seeFeed_seeFeed | null> | null | undefined =
    ({ item: photo }) => {
      return photo && <Photo {...photo} />
    }

  const refresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 25 }}
      onPress={() => navigation.navigate('Messages')}
    >
      <Ionicons name='paper-plane' color='white' size={20} />
    </TouchableOpacity>
  )

  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    })
  }, [])

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReached={() =>
          fetchMore({ variables: { offset: data?.seeFeed?.length } })
        }
        onEndReachedThreshold={0.02}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => '' + photo?.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  )
}

export default Feed
