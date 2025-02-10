import { View, Text } from "react-native";
import React from "react";

interface CourseBadgeProps {
  course: string;
}

const CourseBadge = (props: CourseBadgeProps) => {
  return (
    <View
      style={{
        backgroundColor: "#2b303c",
        borderRadius: 999,
        paddingVertical: 4,
        alignSelf: "flex-start",
      }}
    >
      <Text className="text-text text-sm font-semibold px-4">
        {props.course}
      </Text>
    </View>
  );
};

export default CourseBadge;
