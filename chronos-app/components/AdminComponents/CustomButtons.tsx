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
    <View className="flex justify-center items-center px-3 py-5">
      <Pressable className="py-2 active:bg-gray-700  ">
        <AntDesign name="swap" size={24} color="white" />
      </Pressable>
      <Text className="text-white font-bold">{title}</Text>
    </View>
  );
};

export default CustomButtons;
