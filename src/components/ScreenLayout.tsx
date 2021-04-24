import React, { FC } from 'react'
import { ActivityIndicator, View } from 'react-native'

interface IProps {
  loading: boolean
}

const ScreenLayout: FC<IProps> = ({ loading, children }) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loading ? <ActivityIndicator color='white' /> : children}
    </View>
  )
}

export default ScreenLayout
