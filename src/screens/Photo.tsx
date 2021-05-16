import { useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import gql from 'graphql-tag'
import React, { useState, VFC } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import Photo from '../components/Photo'
import ScreenLayout from '../components/ScreenLayout'
import { PHOTO_FRAGMENT } from '../fragments'
import { NavParamList } from '../navigators/navigators'
import { seePhoto, seePhotoVariables } from '../__generated__/seePhoto'

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`

type PhotoScreenNavigationProp = StackNavigationProp<NavParamList, 'Photo'>

type PhotoScreenRouteProp = RouteProp<NavParamList, 'Photo'>

interface IProps {
  navigation: PhotoScreenNavigationProp
  route: PhotoScreenRouteProp
}

const PhotoScreen: VFC<IProps> = ({ navigation, route }) => {
  const { data, loading, refetch } = useQuery<seePhoto, seePhotoVariables>(
    SEE_PHOTO,
    {
      variables: {
        id: route.params.photoId,
      },
    }
  )
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ backgroundColor: 'black' }}
        contentContainerStyle={{
          backgroundColor: 'black',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  )
}

export default PhotoScreen
