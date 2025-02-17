import { View, Text } from "react-native";
import React from "react";
import PermanentSwapTabBar from "@/components/swap-components/PermenentSwapTabBar";

const permanentSwap = () => {
  return (
    <View className="flex-1 bg-gray-100">
      <PermanentSwapTabBar />
    </View>
  );
};

export default permanentSwap;
