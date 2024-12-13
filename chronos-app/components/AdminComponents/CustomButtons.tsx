import React from "react";
import { View, Pressable, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface CustomButtonsProps {
  title: string;
  iconName: any; // Icon name prop
  iconSize?: number; // Optional size for the icon
  iconColor?: string; // Optional color for the icon
}

const CustomButtons: React.FC<CustomButtonsProps> = ({
  title,
  iconName,
  iconSize = 36,
  iconColor = "white",
}) => {
  return (
    <View>
      <Pressable
        className="justify-center items-center"
        android_ripple={{ color: "rgba(253, 253, 255, 0.1)", borderless: true }}
      >
        <AntDesign name={iconName} size={iconSize} color={iconColor} />
      </Pressable>
      <Text className="text-white text-center text-sm p-4">{title}</Text>
    </View>
  );
};

export default CustomButtons;
