import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

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
      const ACCESS_TOKEN = '<ACCESS-TOKEN-HERE>';
      const REFRESH_TOKEN = '<REFRESH-TOKEN-HERE>';

      const response = await fetch("", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Refresh': REFRESH_TOKEN,
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
    <View className="flex-1 p-6 bg-[#121212]">
      <Text className="text-[#fafafa] text-4xl font-semibold mb-6">Edit Slots</Text>

      {/* Temp Slot A - Date Input */}
      <View className="mb-4">
        <Text className="text-[#fafafa] text-lg mb-2">Temp Slot A - Date</Text>
        <TextInput
          style={{ color: "#fafafa", backgroundColor: "#494949", padding: 20, borderRadius: 8 }}
          value={tempDateA}
          onChangeText={setTempDateA}
          placeholder="Enter Date for Slot A"
          placeholderTextColor="#fafafa"
        />
      </View>

      {/* Temp Slot A - Slot Input */}
      <View className="mb-4">
        <Text className="text-[#fafafa] text-lg mb-2">Temp Slot A - Slot</Text>
        <TextInput
          style={{ color: "#fafafa", backgroundColor: "#494949", padding: 20, borderRadius: 8 }}
          value={tempSlotA ? tempSlotA.toString() : ""}
          onChangeText={(value) => setTempSlotA(parseInt(value))}
          placeholder="Enter Slot A"
          keyboardType="numeric"
          placeholderTextColor="#fafafa"
        />
      </View>

      {/* Temp Slot B - Date Input */}
      <View className="mb-4">
        <Text className="text-[#fafafa] text-lg mb-2">Temp Slot B - Date</Text>
        <TextInput
          style={{ color: "#fafafa", backgroundColor: "#494949", padding: 20, borderRadius: 8 }}
          value={tempDateB}
          onChangeText={setTempDateB}
          placeholder="Enter Date for Slot B"
          placeholderTextColor="#fafafa"
        />
      </View>

      {/* Temp Slot B - Slot Input */}
      <View className="mb-4">
        <Text className="text-[#fafafa] text-lg mb-2">Temp Slot B - Slot</Text>
        <TextInput
          style={{ color: "#fafafa", backgroundColor: "#494949", padding: 20, borderRadius: 8 }}
          value={tempSlotB ? tempSlotB.toString() : ""}
          onChangeText={(value) => setTempSlotB(parseInt(value))}
          placeholder="Enter Slot B"
          keyboardType="numeric"
          placeholderTextColor="#fafafa"
        />
      </View>

      {/* Swap Button */}
      <TouchableOpacity className="bg-[#3fcf8e] p-4 rounded-lg mt-2" onPress={swapSlots}>
        <Text className="text-[#121212] text-lg font-semibold text-center">Swap Slots</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditSlots;
