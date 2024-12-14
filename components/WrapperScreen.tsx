import { Colors } from '@/constants/Colors'
import React from 'react'
import { View } from 'react-native'

function WrapperScreen({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary.textPrimary,
      }}
    >
      {children}
    </View>
  )
}

export default WrapperScreen