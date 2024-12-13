import "../../global.css";
import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtons from "@/components/AdminComponents/CustomButtons";
import ProgressBar from "@/components/AdminComponents/ProgressBar";
const imgUrl = require("../../assets/images/adminbg6.jpg");
const imgUrl2 = require("../../assets/images/adminfooter.png");

const Admin = () => {
  return (
    <SafeAreaView className="flex-1 bg-mybg">
      <View className="h-[30%]">
        <ImageBackground
          source={imgUrl}
          className="flex-1 justify-center"
          resizeMode="cover"
        >
          {/* <Text className=" text-white text-lg font-bold">
            Hello Admin
          </Text>
          <Text className=" text-white text-lg font-bold mb-24">
            Welcome!
          </Text> */}
        </ImageBackground>
      </View>

      <View className="h-[30%] flex-col justify-center mt-4 gap-4">

  <View className="flex flex-row justify-center">
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} />
    </View>
  </View>
  <View className="flex flex-row justify-center mt-3">
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} />
    </View>
    <View className="flex-1 items-center">
      <CustomButtons title={"Create Event"} />
    </View>
  </View>
</View>


      <View className="h-=[30%] flex justify-center">
        <Text className="text-center text-white text-lg font-semibold mb-2 mt-2">
          Progress Overview
        </Text>
        <ProgressBar />
      </View>

    
      <View className="h-[30%] border-b">
        <ImageBackground
          source={imgUrl2}
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
