import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, VFC } from 'react'
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { seeFeed_seeFeed } from '../__generated__/seeFeed'

const Container = styled.View``
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`
const Username = styled.Text`
  color: white;
  font-weight: 600;
`
const File = styled.Image``
const Actions = styled.View``
const Action = styled.TouchableOpacity``
const Caption = styled.View``
const CaptionText = styled.Text`
  color: white;
`
const Likes = styled.Text`
  color: white;
`

const Photo: VFC<seeFeed_seeFeed> = ({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
}) => {
  const navigation = useNavigation()
  const { width, height } = useWindowDimensions()
  const [imageHeight, setImageHeight] = useState(height - 450)
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height / 10)
    })
  }, [file])

  return (
    <Container>
      <Header onPress={() => navigation.navigate('Profile')}>
        {user.avatar && (
          <UserAvatar resizeMode='cover' source={{ uri: user.avatar }} />
        )}
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode='cover'
        style={{
          width,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
      <Caption>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Username>{user.username}</Username>
        </TouchableOpacity>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  )
}

export default Photo
