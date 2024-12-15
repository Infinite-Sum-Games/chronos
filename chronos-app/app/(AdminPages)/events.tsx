import { View, Text } from 'react-native'
import React from 'react'
import { useSearchParams } from 'expo-router/build/hooks';

const events = () => {
  const type  = useSearchParams();
  return (
    <View>
      <Text>events</Text>
      <Text>{type}</Text>
    </View>
  )
}

export default events