import { View, Text, Button, TextInput } from "react-native";
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
    <View>
      <Text>Event Form - {eventType}</Text>

      <TextInput
        placeholder="Title"
        value={formData.Title}
        onChangeText={(text) => handleEdit("Title", text)}
      />

      <TextInput
        placeholder="Description"
        value={formData.description}
        onChangeText={(text) => handleEdit("description", text)}
      />

      <TextInput
        placeholder="Date"
        value={formData.date}
        onChangeText={(text) => handleEdit("date", text)}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Events;
