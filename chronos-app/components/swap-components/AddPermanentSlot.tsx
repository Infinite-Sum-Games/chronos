import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

// Function to simulate the API request
const addPermanentSlot = async (day: string, slot: number, courseId: string) => {
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
      day,
      slot,
      courseId,
    }),
  });

  const data = await response.json();
  
  if (response.ok) {
    Alert.alert('Success', `Slot ${slot} for ${courseId} added on ${day}`);
  } else {
    Alert.alert('Error', data.message || 'Something went wrong');
  }
};

const AddPermanentSlot = () => {
  const [day, setDay] = useState<string>('');
  const [slot, setSlot] = useState<number | string>('');
  const [courseId, setCourseId] = useState<string>('');

  const handleSubmit = () => {
    if (!day || !slot || !courseId) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    addPermanentSlot(day, Number(slot), courseId);
  };

  return (
    <View className="flex-1 bg-[#121212] p-6">
      <Text className="text-[#fafafa] text-4xl font-semibold mb-6">Add Permanent Slot</Text>

      {/* Day Picker */}
      <View className="mb-4 bg-[#494949] text-[#fafafa] rounded-md">
        <Picker
          selectedValue={day}
          onValueChange={(itemValue) => setDay(itemValue)}
          style={{ color: '#fafafa' }}
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
        className="w-full bg-[#494949] text-[#fafafa] p-5 rounded-md mb-4"
        placeholder="Slot Number"
        placeholderTextColor="#fafafa"
        keyboardType="numeric"
        value={String(slot)}
        onChangeText={(text) => setSlot(text)}
      />

      {/* Course ID Input */}
      <TextInput
        className="w-full bg-[#494949] text-[#fafafa] p-5 rounded-md mb-4"
        placeholder="Course ID"
        placeholderTextColor="#fafafa"
        value={courseId}
        onChangeText={setCourseId}
      />

      <TouchableOpacity
        className="bg-[#3fcf8e] p-4 rounded-md w-full active:opacity-80"
        onPress={handleSubmit}
      >
        <Text className="text-center text-[#121212] font-semibold">Add Slot</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default AddPermanentSlot;
