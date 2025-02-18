import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

const exam = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");  // Hour input state
  const [minute, setMinute] = useState("");  // Minute input state
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleFormSubmit = async () => {
    if (!day || !month || !year || !hour || !minute || !courseId || !description) {
      setError("Please fill all fields.");
      return;
    }
    const selectedDate = new Date(Number(year), Number(month) - 1, Number(day));
    
    if (isNaN(selectedDate.getTime())) {
      setError("Invalid date. Please check the day, month, and year.");
      return;
    }
    const time = `${hour}:${minute}`;

    const ExamData = {
      date: selectedDate.toLocaleDateString(),
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

      const data = await response.json();

      if (data.message === "Activity added successfully") {
        Alert.alert("Success", `Activity added successfully: ${data.activityId}`);
      } else {
        setError("Failed to add activity");
      }
    } catch (e) {
      setError("An error occurred while adding the activity.");
    }
  };

  return (
    <View className="flex-1 bg-[#121212] p-6">
      <Text className="font-bold text-4xl mt-3 text-[#fafafa]">Add Exam</Text>

      {/* Date Input */}
      <View className="flex-row mt-5 w-full space-x-4">
        <TextInput
          className="bg-[#202020] text-[#fafafa] p-4 rounded-lg w-3/12 mr-2"
          placeholder="Day"
          placeholderTextColor="#fafafa"
          keyboardType="numeric"
          value={day}
          onChangeText={setDay}
        />
        <TextInput
          className="bg-[#202020] text-[#fafafa] p-4 rounded-lg w-3/12 mr-2"
          placeholder="Month"
          placeholderTextColor="#fafafa"
          keyboardType="numeric"
          value={month}
          onChangeText={setMonth}
        />
        <TextInput
          className="bg-[#202020] text-[#fafafa] p-4 rounded-lg w-3/12"
          placeholder="Year"
          placeholderTextColor="#fafafa"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
      </View>

      {/* Time Input (Hour and Minute) */}
      <View className="flex-row mt-5 w-full">
        <TextInput
          className="bg-[#202020] text-[#fafafa] p-4 rounded-lg w-5/12 mr-2"
          placeholder="Hour"
          placeholderTextColor="#fafafa"
          keyboardType="numeric"
          value={hour}
          onChangeText={setHour}
        />
        <TextInput
          className="bg-[#202020] text-[#fafafa] p-4 rounded-lg w-5/12"
          placeholder="Minute"
          placeholderTextColor="#fafafa"
          keyboardType="numeric"
          value={minute}
          onChangeText={setMinute}
        />
      </View>


      {/* Course ID Input */}
      <TextInput
        className="bg-[#202020] text-[#fafafa] p-4 rounded-lg mt-5"
        placeholder="Course ID"
        placeholderTextColor="#fafafa"
        value={courseId}
        onChangeText={setCourseId}
      />

      {/* Description Input */}
      <TextInput
        className="bg-[#202020] text-[#fafafa] p-4 rounded-lg mt-5"
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
