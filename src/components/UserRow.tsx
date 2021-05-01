import React, { VFC } from 'react'
import styled from 'styled-components/native'

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
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

const Wrapper = styled.View``
const FollowBtn = styled.TouchableOpacity``
const FollowBtnText = styled.Text``

interface IProps {
  __typename: 'User'
  id: number
  username: string
  avatar: string | null
  isFollowing: boolean
  isMe: boolean
}

const UserRow: VFC<IProps> = ({ avatar, username, isFollowing, isMe }) => {
  return (
    <Wrapper>
      <Column>
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
