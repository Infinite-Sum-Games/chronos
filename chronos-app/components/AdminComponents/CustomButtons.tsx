import { View, Text } from "react-native";
import "../../global.css";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";
interface CustomButtonsProps {
  title: String;
}
const CustomButtons: React.FC<CustomButtonsProps> = ({ title }) => {
  return (
    <View className="flex justify-center items-center px-2 py-4">
      <Pressable className="px-4 py-2 active:bg-gray-700 my-2 border border-white">
        <AntDesign name="swap" size={24} color="white" />
      </Pressable>
      <Text className="text-white font-bold">{title}</Text>
    </View>
  );
};

export default CustomButtons;
