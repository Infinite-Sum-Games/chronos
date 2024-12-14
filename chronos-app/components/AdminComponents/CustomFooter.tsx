import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View className="bg-[#151515] px-6 py-8 rounded-t-3xl relative overflow-hidden border border-gray-700">
      <View className="absolute inset-0">
        <View className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#1E293B] to-transparent opacity-20" />
        <View className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-[#374151] to-transparent opacity-20" />
      </View>
      <View className="items-center relative">
        <Text className="text-white text-lg font-semibold text-center mb-4">
          Made  by Infinite Sum Games
        </Text>
        <View className="flex-row items-center space-x-4">
  <TouchableOpacity className="bg-[#17191b] p-3 rounded-full">
    <Ionicons name="logo-github" size={22} color="#FFFFFF" />
  </TouchableOpacity>
  <Text className="text-[#4a7fd5] text-base">https://github.com/IAmRiteshKoushik</Text>
</View>

      </View>

      <View className="border-t border-[#374151] mt-6 pt-4 relative">
        <Text className="text-gray-400 text-center text-sm">
          © 2024 Infinite Sum Games. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

export default Footer;
