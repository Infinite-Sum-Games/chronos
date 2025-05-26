import * as React from "react";
import { View, Text, useWindowDimensions, TextInput } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import EditSlots from "./EditSlots";
import CopyDay from "./CopyDay";

const renderScene = SceneMap({
  editSlots: EditSlots,
  copyDay: CopyDay,
});

export default function TemporarySwapTabBar() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: "editSlots", title: "Edit Slots" },
    { key: "copyDay", title: "Copy Day" },
  ];

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "#202020" }}  // Accent color
          indicatorStyle={{ backgroundColor: "#3fcf8e" }}  // Primary color
          labelStyle={{ color: "#fafafa", fontWeight: "bold", fontSize: 16 }}  // Text color
        />
      )}
    />
  );
}
