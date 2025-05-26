import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import DatePickerInput from "./DatePickerInput";

const CopyDay = () => {
    const [selectedDay, setSelectedDay] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [date, setDate] = useState(new Date());

    const onSubmit = () => {
        if (selectedDay === "") {
            setError("Please select a valid day.");
            return;
        }
    };

    return (
        <View className="flex-1 p-6 bg-[#121212]">
            <Text className="font-bold text-4xl mt-3 text-[#fafafa]">Copy Day</Text>
            <Text className="text-2xl mt-3 mb-3 text-[#fafafa] font-semibold">Date</Text>
            <DatePickerInput value={date} onChange={setDate}/>
            <Text className="text-2xl text-[#fafafa] font-semibold my-3">Day</Text>
            <View className="mb-4 bg-[#202020] text-[#fafafa] rounded-lg border border-[#2d2d2d]">
                <Picker
                    selectedValue={selectedDay}
                    onValueChange={(itemValue) => setSelectedDay(itemValue)}
                    style={{ color: '#fafafa' }}
                >
                    <Picker.Item label="Select the day" value="" />
                    <Picker.Item label="Sunday" value="Sunday" />
                    <Picker.Item label="Monday" value="Monday" />
                    <Picker.Item label="Tuesday" value="Tuesday" />
                    <Picker.Item label="Wednesday" value="Wednesday" />
                    <Picker.Item label="Thursday" value="Thursday" />
                    <Picker.Item label="Friday" value="Friday" />
                    <Picker.Item label="Saturday" value="Saturday" />
                </Picker>
            </View>

            <TouchableOpacity
                className="bg-[#3fcf8e] p-4 rounded-lg mt-2"
                onPress={onSubmit}
            >
                <Text className="text-[#121212] text-lg text-center font-semibold">Copy</Text>
            </TouchableOpacity>

            {error && <Text className="text-red-500 text-lg mt-2">{error}</Text>}
        </View>
    );
};

export default CopyDay;
