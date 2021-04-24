import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { FlatList, ListRenderItem, Text, View } from 'react-native'
import Photo from '../components/Photo'
import ScreenLayout from '../components/ScreenLayout'
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragment'
import { seeFeed, seeFeed_seeFeed } from '../__generated__/seeFeed'

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
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
  const { data, loading } = useQuery<seeFeed>(FEED_QUERY)

  const renderPhoto:
    | ListRenderItem<seeFeed_seeFeed | null>
    | null
    | undefined = ({ item: photo }) => {
    return <Photo {...photo} />
  }

  return (
    <ScreenLayout loading={loading}>
      <FlatList
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
