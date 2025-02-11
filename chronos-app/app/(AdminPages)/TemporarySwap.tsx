import { View, Text } from "react-native";
import React from "react";
import TemporarySwapTabBar from "@/components/swap-components/TemporarySwapTabBar";

const TemporarySwap = () => {
  return (
    <View className="flex-1 bg-gray-100">
      <TemporarySwapTabBar />
    </View>
  );
};

export default TemporarySwap;
