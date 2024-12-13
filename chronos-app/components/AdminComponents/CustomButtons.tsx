import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
interface CustomButtonsProps {
  title: string;
}

const CustomButtons: React.FC<CustomButtonsProps> = ({ title }) => {
  return (
    <View>
      <Pressable className="justify-center items-center"
        android_ripple={{ color: "rgba(255, 255, 255, 0.2)", borderless: false }}
      >
        <AntDesign name="swap" size={36} color="white" />
      </Pressable>
      <Text className="text-white text-center text-sm p-4 ">{title}</Text>
    </View>
  );
};



export default CustomButtons;
