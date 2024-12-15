import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View className="bg-[#151515] px-6 py-8 rounded-t-3xl relative overflow-hidden border border-gray-700">
      <View className="items-center relative">
        <Text className="text-lg font-bold text-center text-gray-200 mb-4">
          Made by Infinite Sum Games
        </Text>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="bg-[#17191b] p-3 rounded-full">
            <Ionicons name="logo-github" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-[#4a7fd5] text-base">
            https://github.com/Infinite-Sum-Games
          </Text>
        </View>
      </View>

      <View className="border-t border-[#374151] mt-6 pt-4 relative">
        <Text className="text-gray-400 text-center text-sm">
          © 2024 Infinite Sum Games.
        </Text>
      </View>
    </View>
  );
};

export default Footer;
