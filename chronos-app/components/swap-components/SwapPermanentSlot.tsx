import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

// Function to simulate the API request
const swapPermanentSlot = async (
  removeOn: string,
  removeSlot: number,
  addOn: string,
  addSlot: number
) => {
  const ACCESS_TOKEN = '<ACCESS-TOKEN-HERE>';
  const REFRESH_TOKEN = '<REFRESH-TOKEN-HERE>';

  const response = await fetch("", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Refresh': REFRESH_TOKEN,
    },
    body: JSON.stringify({
      remove_on: removeOn,
      remove_slot: removeSlot,
      add_on: addOn,
      add_slot: addSlot,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    Alert.alert('Success', `Successfully swapped slots between ${removeOn} and ${addOn}`);
  } else {
    Alert.alert('Error', data.message || 'Something went wrong');
  }
};

const SwapPermanentSlot = () => {
  const [removeOn, setRemoveOn] = useState<string>('');
  const [removeSlot, setRemoveSlot] = useState<number | string>('');
  const [addOn, setAddOn] = useState<string>('');
  const [addSlot, setAddSlot] = useState<number | string>('');

  const handleSwap = () => {
    if (!removeOn || !removeSlot || !addOn || !addSlot) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    swapPermanentSlot(removeOn, Number(removeSlot), addOn, Number(addSlot));
  };

  return (
    <View className="flex-1 bg-[#121212] p-6">
      <Text className="text-[#fafafa] text-4xl font-semibold mb-6">Swap Permanent Slot</Text>

      {/* Day Picker for removing */}
      <View className="mb-4 bg-[#202020] text-[#fafafa] rounded-lg border border-[#2d2d2d]">
        <Picker
          selectedValue={removeOn}
          onValueChange={(itemValue) => setRemoveOn(itemValue)}
          style={{ color: '#fafafa' }}
        >
          <Picker.Item label="Select the day to remove a slot from" value="" />
          <Picker.Item label="Sunday" value="Sunday" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
        </Picker>
      </View>

      <TextInput
        className="w-full bg-[#202020] text-[#fafafa] p-5 rounded-lg mb-4 border border-[#2d2d2d]"
        placeholder="Remove Slot Number"
        placeholderTextColor="#fafafa"
        keyboardType="numeric"
        value={String(removeSlot)}
        onChangeText={(text) => setRemoveSlot(text)}
      />

      {/* Day Picker for adding */}
      <View className="mb-4 bg-[#202020] text-[#fafafa] rounded-lg border border-[#2d2d2d]">
        <Picker
          selectedValue={addOn}
          onValueChange={(itemValue) => setAddOn(itemValue)}
          style={{ color: '#fafafa' }}
        >
          <Picker.Item label="Select the day to add a slot to" value="" />
          <Picker.Item label="Sunday" value="Sunday" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
        </Picker>
      </View>

      <TextInput
        className="w-full bg-[#202020] text-[#fafafa] p-5 rounded-lg mb-4 border border-[#2d2d2d]"
        placeholder="Add Slot Number"
        placeholderTextColor="#fafafa"
        keyboardType="numeric"
        value={String(addSlot)}
        onChangeText={(text) => setAddSlot(text)}
      />

      <TouchableOpacity
        className="bg-[#3fcf8e] p-4 rounded-lg w-full active:opacity-80"
        onPress={handleSwap}
      >
        <Text className="text-center text-[#121212] font-semibold">Swap Slot</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwapPermanentSlot;
