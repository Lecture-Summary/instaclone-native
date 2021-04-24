import { gql, useQuery, useReactiveVar } from '@apollo/client'
import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from 'react-native'
import { tokenVar } from '../../apollo'
import ScreenLayout from '../components/ScreenLayout'

import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragment'
import { seeFeed, seeFeed_seeFeed } from '../__generated__/seeFeed'
import Photo from './Photo'

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
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>{photo?.caption}</Text>
      </View>
    )
  }

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeFeed}
        keyExtractor={(photo) => '' + photo?.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  )
}

export default Feed
