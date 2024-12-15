import React from "react";
import { View, Pressable, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CustomButtonsProps {
  title: string;
  iconName: any; 
  iconSize?: number; 
  iconColor?: string; 
  onPress?: () => void; 
 
}

const CustomButtons: React.FC<CustomButtonsProps> = ({
  title,
  iconName,
  iconSize = 35,
  iconColor = "white",
  onPress,
  
}) => {
  return (
    <View>
      <Pressable
        className="justify-center items-center"
        android_ripple={{ color: "rgba(253, 253, 255, 0.1)", borderless: true }}
        onPress={onPress} 
      >
        <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
      </Pressable>
      <Text className="text-white text-center text-sm p-4">{title}</Text>
    </View>
  );
};

export default CustomButtons;
