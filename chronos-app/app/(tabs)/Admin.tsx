import "../../global.css";
import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtons from "@/components/AdminComponents/CustomButtons";
import ProgressBar from "@/components/AdminComponents/ProgressBar";
const imgUrl = require("../../assets/images/adminbg3.jpg");
const hrurl=require("../../assets/images/hr1.jpg")
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


      


      <View className="h-1/4 flex-col justify-center">
        <View className="flex flex-row justify-center">
          <CustomButtons title={"Add Activity"} />
          <CustomButtons title={"View Reports"} />
          <CustomButtons title={"Manage Users"} />
          <CustomButtons title={"Settings"} />
        </View>
        <View className="flex flex-row justify-center">
          <CustomButtons title={"Create Event"} />
          <CustomButtons title={"Approve Requests"} />
          <CustomButtons title={"Notifications"} />
          <CustomButtons title={"Help"} />
        </View>
      </View>
      <View className="border-b border-red-500 opacity-50" />
      <View className="h-1/4 justify-center">
        <Text className="text-white">Number Of Days Left</Text>
        <ProgressBar />
      </View>
      <View className="border-b border-red-500 opacity-50" />
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
    </SafeAreaView>
  );
};

export default Admin;
