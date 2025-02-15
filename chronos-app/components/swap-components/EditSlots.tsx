import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const EditSlots = () => {
  
  // State for input fields
  const [tempDateA, setTempDateA] = useState<string>("");
  const [tempSlotA, setTempSlotA] = useState<number>(0);
  const [tempDateB, setTempDateB] = useState<string>(""); 
  const [tempSlotB, setTempSlotB] = useState<number>(0);

  const swapSlots = async () => {
    const data = {
      temp_date_a: tempDateA,
      temp_slot_a: tempSlotA,
      temp_date_b: tempDateB,
      temp_slot_b: tempSlotB,
    };

    // Call the API to swap slots
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${""}`,
          "Refresh": "",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", `Swapped slot ${tempSlotA} from ${tempDateA} with ${tempSlotB} from ${tempDateB}`);
      } else {
        Alert.alert("Error", result.message || "An error occurred");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to swap slots. Please try again.");
    }
  };

  return (
    <View className="flex-1 p-4 bg-background">
      <Text className="text-text text-xl mb-4">Edit Slots</Text>

      {/* Date and Slot Inputs */}
      <View className="mb-4">
        <Text className="text-cardText text-lg">Temp Slot A</Text>
        <View className="flex-row items-center border border-cardBackground rounded-lg p-2 mb-2 bg-[#61FFFF]">
          <TextInput
            style={{ flex: 1 }}
            value={tempDateA}
            onChangeText={setTempDateA}
            placeholder="Enter Date for Slot A"
            keyboardType="default"
            className="text-[#27282d] px-2"
          />
          <TextInput
            style={{ flex: 1 }}
            value={tempSlotA ? tempSlotA.toString() : ""}
            onChangeText={(value) => setTempSlotA(parseInt(value))}
            placeholder="Enter Slot A"
            keyboardType="numeric"
            className="text-[#27282d] px-2"
          />
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-cardText text-lg">Temp Slot B</Text>
        <View className="flex-row items-center border border-cardBackground rounded-lg p-2 mb-2 bg-[#61FFFF]">
          <TextInput
            style={{ flex: 1 }}
            value={tempDateB}
            onChangeText={setTempDateB}
            placeholder="Enter Date for Slot B"
            keyboardType="default"
            className="text-[#27282d] px-2"
          />
          <TextInput
            style={{ flex: 1 }}
            value={tempSlotB ? tempSlotB.toString() : ""}
            onChangeText={(value) => setTempSlotB(parseInt(value))}
            placeholder="Enter Slot B"
            keyboardType="numeric"
            className="text-[#27282d] px-2"
          />
        </View>
      </View>

      {/* Swap Button */}
      <Button title="Swap Slots" onPress={swapSlots} color="#0b6b91" />
    </View>
  );
};

export default EditSlots;
