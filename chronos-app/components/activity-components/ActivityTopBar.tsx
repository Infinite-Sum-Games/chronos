import { View, Text } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const ActivityTopBar = () => {
  return (
    <View className="flex flex-row justify-between items-center pt-10 pb-6 px-6">
      <View>
        <Text className="text-[#fafafa] text-4xl font-bold">Activities</Text>
      </View>
      <View className="flex flex-row">
        <View className="mr-8">
          <FontAwesome6 name="filter" size={20} color="#3fcf8e" />
        </View>

        <View>
          <FontAwesome6 name="ellipsis-vertical" size={20} color="#3fcf8e" />
        </View>
      </View>
    </View>
  );
};

export default ActivityTopBar;
