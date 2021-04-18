import React, { VFC } from 'react'
import { Ionicons } from '@expo/vector-icons'

interface IProps {
  iconName: any
  color: string
  focused: boolean
}

const TabIcon: VFC<IProps> = ({ iconName, color, focused }) => {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={22}
    />
  )
}

export default TabIcon
