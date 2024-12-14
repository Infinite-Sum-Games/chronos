import "../../global.css";
import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtons from "@/components/AdminComponents/CustomButtons";
import ProgressBar from "@/components/AdminComponents/ProgressBar";
import Footer from "@/components/AdminComponents/CustomFooter";
import { AntDesign } from "@expo/vector-icons";
const imgUrl = require("../../assets/images/adminbg2.jpg");


const Admin = () => {
  return (
    <SafeAreaView className="flex-1 bg-mybg">
      <View className="h-[30%]">
      <ImageBackground
  source={imgUrl}
  className="flex-1 justify-center items-center relative"
>
  <View
    className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30"
  />
   <View className="absolute bottom-10 flex-row gap-6">
    <View className="justify-center items-center">
      <View className="bg-white rounded-full w-16 h-16 justify-center items-center">
        <AntDesign name="user" size={30} color="#050C9C" />
      </View>
      <Text className="text-white text-sm mt-2">Admin</Text>
    </View>
  </View>
  <View className="absolute top-16 items-center">
    <Text className="text-center text-white text-2xl font-bold shadow-lg">
      Welcome
    </Text>
    <Text className="text-center text-white text-sm mt-2">
      Manage your operations
    </Text>
  </View>
 
</ImageBackground>

      </View>

      <View className="h-[28%] flex-col justify-center mt-4 gap-4">

  <View className="flex flex-row justify-center">
    <View className="flex-1 items-center">
      <CustomButtons title={"Temporary swap"} iconName="sync"/>
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Permanent swap"} iconName="retweet" />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Exam"} iconName="profile" />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Assignment"} iconName="form" />
    </View>
  </View>
  <View className="flex flex-row justify-center mt-3">
    <View className="flex-1 items-center">
      <CustomButtons title={"Tutorial"} iconName="book" />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Quiz"} iconName="questioncircleo"/>
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Evaluation"} iconName="staro"/>
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"OTP"} iconName="lock"/>
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
