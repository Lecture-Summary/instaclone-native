import { useNavigation } from '@react-navigation/core'
import React, { VFC } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`
const Username = styled.Text`
  font-weight: 600;
  color: white;
`
const Wrapper = styled.View`
  padding: 5px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
`
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`

interface IProps {
  __typename: 'User'
  id: number
  username: string
  avatar: string | null
  isFollowing: boolean
  isMe: boolean
}

const UserRow: VFC<IProps> = ({ avatar, username, isFollowing, isMe, id }) => {
  const navigation = useNavigation()

  return (
    <Wrapper>
      <Column onPress={() => navigation.navigate('Profile', { username, id })}>
        {avatar ? <Avatar source={{ uri: avatar }} /> : null}
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? 'Unfollow' : 'Follow'}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  )
}

export default UserRow
