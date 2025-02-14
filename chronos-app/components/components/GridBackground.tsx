import React from "react";
import { View } from "react-native";
import OrganizeSVG from "../../assets/images/ooorganize.svg";

const GridBackground = () => {
  return (
    <View className="absolute inset-0 w-full h-full">
      <OrganizeSVG
        width="120%"
        height="120%"
        preserveAspectRatio="none"
      />
    </View>
  );
};

export default GridBackground;
