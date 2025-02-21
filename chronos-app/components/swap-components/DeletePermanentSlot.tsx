import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

// Function to simulate the API request for deleting a permanent slot
const deletePermanentSlot = async (day: string, slot: number) => {
  const ACCESS_TOKEN = '<ACCESS-TOKEN-HERE>';
  const REFRESH_TOKEN = '<REFRESH-TOKEN-HERE>';

  const response = await fetch("", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Refresh': REFRESH_TOKEN,
    },
    body: JSON.stringify({
      day,
      slot,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    Alert.alert('Success', `Successfully deleted slot ${slot} on ${day}`);
  } else {
    Alert.alert('Error', data.message || 'Something went wrong');
  }
};

const DeletePermanentSlot = () => {
  const [day, setDay] = useState<string>('');
  const [slot, setSlot] = useState<number | string>('');

  const handleDelete = () => {
    if (!day || !slot) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    deletePermanentSlot(day, Number(slot));
  };

  return (
    <View className="flex-1 bg-[#121212] p-6">
      <Text className="text-[#fafafa] text-4xl font-semibold mb-6">Delete Permanent Slot</Text>

      {/* Day Picker */}
      <View className="mb-4 bg-[#202020] text-[#fafafa] rounded-lg border border-[#2d2d2d]">
        <Picker
          selectedValue={day}
          onValueChange={(itemValue) => setDay(itemValue)}
          style={{ color: '#fafafa'}}
        >
          <Picker.Item label="Select a day" value="" />
          <Picker.Item label="Sunday" value="Sunday" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
        </Picker>
      </View>

      {/* Slot Number Input */}
      <TextInput
        className="w-full bg-[#202020] text-[#fafafa] p-5 rounded-lg mb-4 border border-[#2d2d2d]"
        placeholder="Slot Number"
        placeholderTextColor="#fafafa"
        keyboardType="numeric"
        value={String(slot)}
        onChangeText={(text) => setSlot(text)}
      />

      {/* Delete Button */}
      <TouchableOpacity
        className="bg-[#3fcf8e] p-4 rounded-lg w-full active:opacity-80"
        onPress={handleDelete}
      >
        <Text className="text-center text-[#121212] font-semibold">Delete Slot</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeletePermanentSlot;
