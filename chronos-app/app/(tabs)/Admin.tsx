import "../../global.css";
import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtons from "@/components/AdminComponents/CustomButtons";
import ProgressBar from "@/components/AdminComponents/ProgressBar";
import Footer from "@/components/AdminComponents/CustomFooter";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const imgUrl = require("../../assets/images/adminbg2.jpg");

const Admin = () => {
  const router = useRouter();
  const navigateToEvent = (type: any) => {
    router.push({
      pathname: "/events",
      params: { type },
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-mybg">
      <View className="h-[30%]">
        <ImageBackground
          source={imgUrl}
          className="flex-1 justify-center items-center relative"
        >
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30" />

          <View className="justify-center items-center">
            <View className="bg-white rounded-full w-16 h-16 justify-center items-center">
              <AntDesign name="user" size={34} />
            </View>
            <Text className="text-white text-sm mt-2">Admin</Text>
          </View>
        </ImageBackground>
      </View>

      <View className="h-[28%] flex-col justify-center mt-4 gap-4">
        <View className="flex flex-row justify-center">
          <View className="flex-1 items-center">
            <CustomButtons
              title={"Temporary swap"}
              iconName="cached"
              onPress={() => router.push("/(AdminPages)/TemporarySwap")}
            />
          </View>
          <View className="flex-1 items-center">
            <CustomButtons
              title={"Permanent swap"}
              iconName="swap-horiz"
              onPress={() => router.push("/(AdminPages)/PermanentSwap")}
            />
          </View>
          <View className="flex-1 items-center">
            <CustomButtons
              title={"Exam"}
              iconName="school"
              onPress={() => router.push("/(AdminPages)/Exam")}
            />
          </View>
          <View className="flex-1 items-center">
            <CustomButtons
              title={"Assignment"}
              iconName="assignment-add"
              onPress={() => navigateToEvent("Assignment")}
            />
          </View>
        </View>
        <View className="flex flex-row justify-center mt-3">
          <View className="flex-1 items-center">
            <CustomButtons
              title={"Tutorial"}
              iconName="cast-for-education"
              onPress={() => navigateToEvent("Tutorial")}
            />
          </View>
          <View className="flex-1 items-center">
            <CustomButtons
              title={"Quiz"}
              iconName="quiz"
              onPress={() => navigateToEvent("Quiz")}
            />
          </View>
          <View className="flex-1 items-center">
            <CustomButtons
              title={"Evaluation"}
              iconName="checklist"
              onPress={() => navigateToEvent("Evaluation")}
            />
          </View>
          <View className="flex-1 items-center">
            <CustomButtons
              title={"OTP"}
              iconName="vpn-key"
              onPress={() => router.push("/(AdminPages)/Otp")}
            />
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
