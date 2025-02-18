import * as React from "react";
import { View, Text, useWindowDimensions, TextInput } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AddPermanentSlot from "./AddPermanentSlot";
import DeletePermanentSlot from "./DeletePermanentSlot";
import SwapPermanentSlot from "./SwapPermanentSlot";

const renderScene = SceneMap({
  addSlot: AddPermanentSlot,
  swapSlot: SwapPermanentSlot,
  deleteSlot: DeletePermanentSlot,
});

export default function PermanentSwapTabBar() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: "addSlot", title: "Add Slot" },
    { key: "swapSlot", title: "Swap Slot" },
    { key: "deleteSlot", title: "Delete Slot" },
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
