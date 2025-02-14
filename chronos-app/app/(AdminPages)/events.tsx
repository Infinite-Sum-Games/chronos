import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import GridBackground from "@/components/components/GridBackground"; // Import the Grid Background Component

type EventType = "Assignment" | "Tutorial" | "Quiz" | "Evaluation";

interface EventField {
  courseId: string;
  description: string;
  date: string;
  time: string;
}

const Events: React.FC = () => {
  const params = useSearchParams();
  const eventType = (params.get("type") as EventType) || "Assignment";

  const [formData, setFormData] = useState<EventField>({
    courseId: "",
    description: "",
    date: "",
    time: "",
  });

  const handleEdit = (field: keyof EventField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
  };

  return (
    <View className="flex-1 bg-mybg px-6 py-10 relative">
      <GridBackground />
      <Text className="text-center text-4xl font-bold text-white mb-14">
        Add {eventType}
      </Text>

      <View className="bg-transparent border border-gray-600 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
        <Text className="text-lg font-semibold text-white mb-4">Enter {eventType} Details:</Text>

        {/* Course ID Input */}
        <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 mb-4">
          <Ionicons name="book-outline" size={20} color="#ccc" className="mr-2" />
          <TextInput
            placeholder="Course ID"
            placeholderTextColor="#ccc"
            value={formData.courseId}
            onChangeText={(text) => handleEdit("courseId", text)}
            className="flex-1 text-white"
          />
        </View>
        <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 mb-4">
          <Ionicons name="document-text-outline" size={20} color="#ccc" className="mr-2" />
          <TextInput
            placeholder="Description"
            placeholderTextColor="#ccc"
            value={formData.description}
            onChangeText={(text) => handleEdit("description", text)}
            className="flex-1 text-white"
            multiline
          />
        </View>
        <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 mb-4">
          <Ionicons name="calendar-outline" size={20} color="#ccc" className="mr-2" />
          <TextInput
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor="#ccc"
            value={formData.date}
            onChangeText={(text) => handleEdit("date", text)}
            className="flex-1 text-white"
          />
        </View>
        <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 mb-6">
          <Ionicons name="time-outline" size={20} color="#ccc" className="mr-2" />
          <TextInput
            placeholder="Time (HH:MM:SS)"
            placeholderTextColor="#ccc"
            value={formData.time}
            onChangeText={(text) => handleEdit("time", text)}
            className="flex-1 text-white"
          />
        </View>
        <Pressable
          onPress={handleSubmit}
          className="w-full bg-blue-600 py-3 rounded-xl shadow-md active:bg-blue-700 flex-row items-center justify-center"
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="white" className="mr-2" />
          <Text className="text-white text-center font-semibold text-lg">ADD</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Events;
