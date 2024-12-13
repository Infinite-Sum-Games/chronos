import "../../global.css";
import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtons from "@/components/AdminComponents/CustomButtons";
import ProgressBar from "@/components/AdminComponents/ProgressBar";
import Footer from "@/components/AdminComponents/CustomFooter";
const imgUrl = require("../../assets/images/adminbg2.jpg");
const imgUrl2 = require("../../assets/images/adminbg5nobg.png");

const Admin = () => {
  return (
    <SafeAreaView className="flex-1 bg-mybg">
      <View className="h-[30%]">
        <ImageBackground
          source={imgUrl}
          className="flex-1 justify-center items-center"
          
        >
          <Text className="text-center text-white text-lg font-bold">
            Hello Admin
          </Text>
    
        </ImageBackground>
      </View>

      <View className="h-[28%] flex-col justify-center mt-4 gap-4">

  <View className="flex flex-row justify-center">
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} iconName="plus"/>
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} iconName="plus" />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} iconName="plus" />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} iconName="plus" />
    </View>
  </View>
  <View className="flex flex-row justify-center mt-3">
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} iconName="plus" />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} iconName="plus"/>
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} iconName="plus"/>
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} iconName="plus"/>
    </View>
  </View>
</View>

<View className="flex flex-col justify-between items-center">
  <Text className="text-white text-center text-2xl font-bold mt-4">
    Progress Overview
  </Text>

  <View className="flex-grow flex justify-center mb-10 w-full">
    <ProgressBar />
  </View>
</View>

    
      <View className="border-b">
         <Footer />
      </View>
    </SafeAreaView>
  );
};

export default Admin;
