import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";

type EventType = "Assignment" | "Tutorial" | "Quiz" | "Evaluation";

interface EventField {
  Title: string;
  description: string;
  date: string;
}

const Events: React.FC = () => {
  const params = useSearchParams();
  const eventType = (params.get("type") as EventType) || "Assignment";

  const [formData, setFormData] = useState<EventField>({
    Title: "",
    description: "",
    date: "",
  });

  const handleEdit = (field: keyof EventField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
  };

  return (
    <View className="flex-1 bg-mybg px-6 py-8">
    
      <Text className="text-center text-3xl font-bold text-white mb-8">
        {eventType} Event Form
      </Text>

    
      <View className="bg-transparent border border-gray-600 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
        <Text className="text-lg font-semibold text-white mb-4">
          Enter Event Details:
        </Text>

        <TextInput
          placeholder="Title"
          placeholderTextColor="#ccc"
          value={formData.Title}
          onChangeText={(text) => handleEdit("Title", text)}
          className="w-full bg-mybg px-4 py-3 border border-gray-600 rounded-lg text-white mb-4"
        />

        <TextInput
          placeholder="Description"
          placeholderTextColor="#ccc"
          value={formData.description}
          onChangeText={(text) => handleEdit("description", text)}
          className="w-full bg-mybg px-4 py-3 border border-gray-600 rounded-lg text-white mb-4"
          multiline
        />

        <TextInput
          placeholder="Date (YYYY-MM-DD)"
          placeholderTextColor="#ccc"
          value={formData.date}
          onChangeText={(text) => handleEdit("date", text)}
          className="w-full bg-mybg px-4 py-3 border border-gray-600 rounded-lg text-white mb-6"
        />
        <Pressable
          onPress={handleSubmit}
          className="w-full bg-blue-600 py-3 rounded-xl shadow-md shadow-blue-500 active:bg-blue-700"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Submit
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Events;
