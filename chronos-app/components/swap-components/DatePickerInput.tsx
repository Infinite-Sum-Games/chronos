import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

interface DatePickerInputProps {
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export default function DatePickerInput({
  value,
  onChange,
  placeholder = 'Select date',
}: DatePickerInputProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formattedDate = value ? value.toLocaleDateString('en-GB') : '';

  return (
    <View className="w-full">
      <TouchableOpacity
        className="flex-row items-center justify-between bg-[#202020] rounded-lg border border-[#2d2d2d] p-5"
        onPress={() => setShowPicker(true)}
      >
        <Text className="text-white text-base flex-1">
          {formattedDate || placeholder}
        </Text>
        <Ionicons name="calendar" size={20} color="#3fcf8e" />
      </TouchableOpacity>

      {Platform.OS === 'ios' ? (
        <Modal transparent={true} visible={showPicker} animationType="slide">
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-end"
            onPress={() => setShowPicker(false)}
          >
            <View className="bg-[#121212] rounded-t-xl p-4">
              <View className="flex-row justify-end pb-4">
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <Text className="text-[#3fcf8e] text-base font-semibold">Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                style={{ backgroundColor: '#121212', height: 200 }}
                textColor="#fafafa"
                themeVariant="dark"
                minimumDate={new Date()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      ) : showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={{ backgroundColor: '#121212', height: 200 }}
          textColor="#fafafa"
          design="material"
          title="Select date"
          positiveButton={{ label: 'OK', textColor: '#3fcf8e' }}
          negativeButton={{ label: 'Cancel', textColor: '#202020' }}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}