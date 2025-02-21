import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import DatePickerInput from "@/components/swap-components/DatePickerInput";
import TimePickerInput from "@/components/swap-components/TimePickerInput";

const exam = () => {
  const [day, setDay] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleFormSubmit = async () => {
    if (!day || !time || !courseId || !description) {
      setError("Please fill all fields.");
      return;
    }

    const ExamData = {
      date: day,
      time: time,
      type: "EXAM",
      courseId: courseId,
      description: description,
    };

    try {
      const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer <ACCESS-TOKEN-HERE>`,
        "Refresh": "<REFRESH-TOKEN-HERE>",
      },
      body: JSON.stringify(ExamData),
      });

      if (!response.ok) {
      setError("Failed to add activity");
      } else {
      const data = await response.json();
      Alert.alert("Success", `Activity added successfully: ${data.activityId}`);
      }
    } catch (e) {
      setError("An error occurred while adding the activity.");
    }
  };

  return (
    <View className="flex-1 bg-[#121212] p-6">
      <Text className="font-bold text-4xl mt-3 text-[#fafafa]">Add Exam</Text>

      {/* Date Input */}
      <View className="mt-5">
        <DatePickerInput
          value={day}
          onChange={setDay}
        />
      </View>

      {/* Time Input (Hour and Minute) */}
      <View className="mt-5">
        <TimePickerInput
          value={time}
          onChange={setTime}
        />
      </View>

      {/* Course ID Input */}
      <TextInput
        className="bg-[#202020] text-[#fafafa] p-5 rounded-lg mt-5 border border-[#2d2d2d]"
        placeholder="Course ID"
        placeholderTextColor="#fafafa"
        value={courseId}
        onChangeText={setCourseId}
      />

      {/* Description Input */}
      <TextInput
        className="bg-[#202020] text-[#fafafa] p-5 rounded-lg mt-5 border border-[#2d2d2d]"
        placeholder="Description"
        placeholderTextColor="#fafafa"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-[#3fcf8e] p-4 rounded-lg mt-5"
        onPress={handleFormSubmit}
      >
        <Text className="text-[#121212] text-lg text-center font-semibold">Submit</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {error && <Text className="text-red-500 text-lg mt-4">{error}</Text>}
    </View>
  );
};

export default exam;
