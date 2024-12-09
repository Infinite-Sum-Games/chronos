import '../../global.css';
import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const imgUrl = require('../../assets/images/adminbg2.jpg');

const Admin = () => {
  return (
    <SafeAreaView className="flex-1 bg-mybg">
      <View className="h-1/4">
        <ImageBackground
          source={imgUrl}
          className="flex-1 justify-center items-center"
          resizeMode="cover"
        >
          <Text className="text-center text-white text-lg font-bold">
            Hello Admin
          </Text>
          <Text className="text-center text-white text-lg font-bold">
            Welcome!
          </Text>
        </ImageBackground>
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg">More Content Here</Text>
      </View>
    </SafeAreaView>
  );
};

export default Admin;
