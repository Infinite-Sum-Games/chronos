import '../../global.css'
import { View, Text,Image, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const imgUrl=require("../../assets/images/adminbg2.jpg")
const Admin = () => {
  return (
<SafeAreaView className='flex-1 bg-mybg'>
  <View>

    <Image
    source={imgUrl}
    />
   
    <Text className='text-center text-white'>Hello Admin</Text>
    <Text className='text-center text-white'>Hello</Text>
  </View>
</SafeAreaView>


  )
}

export default Admin