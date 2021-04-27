import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import Photo from '../components/Photo'
import ScreenLayout from '../components/ScreenLayout'
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragment'
import { seeFeed, seeFeed_seeFeed } from '../__generated__/seeFeed'

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
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

const Feed = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data, loading, refetch, fetchMore } = useQuery<seeFeed>(FEED_QUERY, {
    variables: { offset: 0 },
  })

  const renderPhoto:
    | ListRenderItem<seeFeed_seeFeed | null>
    | null
    | undefined = ({ item: photo }) => {
    return photo && <Photo {...photo} />
  }

  const refresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReached={() =>
          fetchMore({ variables: { offset: data?.seeFeed?.length } })
        }
        onEndReachedThreshold={0.05}
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
