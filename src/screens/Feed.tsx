import { gql, useQuery, useReactiveVar } from '@apollo/client'
import React from 'react'
import { Text, View } from 'react-native'
import { tokenVar } from '../../apollo'

import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragment'
import { seeFeed } from '../__generated__/seeFeed'

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
  const { data } = useQuery<seeFeed>(FEED_QUERY)

  console.log(data)

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Feed</Text>
    </View>
  )
}

export default Feed
