import { RouteProp } from '@react-navigation/native'
import React, { VFC } from 'react'
import { View, Text } from 'react-native'
import { NavParamList } from '../navigators/navigators'

type UploadFormRouteProp = RouteProp<NavParamList, 'UploadForm'>

interface IProps {
  route: UploadFormRouteProp
}

const UploadForm: VFC<IProps> = ({ route }) => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default UploadForm
