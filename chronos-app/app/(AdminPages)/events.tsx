import { View, Text, TextInput, Pressable } from "react-native";
import { Button } from 'react-native-paper';
import React, { useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import GridBackground from "@/components/components/GridBackground"; // Import the Grid Background Component
import { DatePickerModal } from 'react-native-paper-dates';
import { en, registerTranslation } from 'react-native-paper-dates';
import { TimePickerModal } from 'react-native-paper-dates';
registerTranslation('en', en);

type EventType = "Assignment" | "Tutorial" | "Quiz" | "Evaluation";

interface EventField {
  courseId: string;
  description: string;
  date: string;
  time: string;
}

const Events: React.FC = () => {
 //TIME PICKER
 const [visible, setVisible] = React.useState(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirmTime = ({ hours, minutes }: { hours: number; minutes: number }) => {
    setVisible(false);
  
    // Format the time as HH:MM
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    handleEdit("time", formattedTime);
  };
  
  



  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  
  const onConfirmSingle = React.useCallback(
    (params: { date: Date }) => {
      setOpen(false);
      const selectedDate = params.date;
      
      // Adjust the date for IST (UTC +5:30)
      const offset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
      const adjustedDate = new Date(selectedDate.getTime() + offset);
      
      setDate(adjustedDate);
      handleEdit("date", adjustedDate.toISOString().split("T")[0]); // Format date as YYYY-MM-DD
    },
    [setOpen, setDate]
  );
  

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
    <View className="flex-1 bg-background px-6 py-10 relative">
      <GridBackground />
      <Text className="text-center text-4xl font-bold text-text mb-14">
        Add {eventType}
      </Text>

      <View className="bg-transparent border border-gray-600 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
        <Text className="text-lg font-semibold text-text mb-4">Enter {eventType} Details:</Text>

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
        <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-2 mb-4">
          <Ionicons name="calendar-outline" size={20} color="#ccc" className="mr-2" />
          <TextInput
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor="#ccc"
            value={formData.date}
            onChangeText={(text) => handleEdit("date", text)}
            className="flex-1 text-white"
          />
          <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <Button
  onPress={() => setOpen(true)}
  uppercase={false}  
  mode="outlined"
  style={{
    backgroundColor: 'transparent',
    borderColor: 'gray',  
    borderWidth: 0.5, 
    paddingVertical: 1,  
    paddingHorizontal: 0,  
    borderRadius: 12, 
    marginLeft: 'auto',  
  }}
  labelStyle={{
    fontSize: 14,  
    color: 'white',  
  }}
>
  Choose
</Button>


            <DatePickerModal
              locale="en"
              mode="single"
              visible={open} 
              onDismiss={onDismissSingle} 
              date={date ?? new Date()} 
              onConfirm={onConfirmSingle} 
            />
          </View>
        </View>


        <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 mb-6">
          <Ionicons name="time-outline" size={20} color="#ccc" className="mr-2" />
          <TextInput
            placeholder="Time (HH:MM)"
            placeholderTextColor="#ccc"
            value={formData.time}
            onChangeText={(text) => handleEdit("time", text)}
            className="flex-1 text-white"
          />

<View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
<Button onPress={() => setVisible(true)} uppercase={false} mode="outlined"
  style={{
    backgroundColor: 'transparent',
    borderColor: 'gray',  
    borderWidth: 0.5, 
    paddingVertical: 1,  
    paddingHorizontal: 0,  
    borderRadius: 12, 
    marginLeft: 'auto',  
  }}
  labelStyle={{
    fontSize: 14,  
    color: 'white',  
  }}>
  Choose
</Button>

        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirmTime}
          hours={12}
          minutes={14}
        />
      </View>
        </View>
        <Pressable
          onPress={handleSubmit}
          className="w-full bg-primary py-3 rounded-xl shadow-md active:bg-blue-700 flex-row items-center justify-center"
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="white" className="mr-2" />
          <Text className="text-text text-center font-semibold text-lg">ADD</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Events;
