import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const dateSchema = z.object({
    day: z.number().min(1).max(31, { message: "Day must be between 1 and 31" }),
    month: z.number().min(1).max(12, { message: "Month must be between 1 and 12" }),
    year: z.number().min(1000).max(9999, { message: "Year must be a four-digit number" }),
});

const CopyDay = () => {
    const [selectedDay, setSelectedDay] = useState("");
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [error, setError] = useState<string | null>(null);

    function formDate(day: number, month: number, year: number) {
        const date = new Date(year, month - 1, day);
        console.log(date.toLocaleString());
        return date;
    }

    useEffect(() => {
        const today = new Date();
        setDay(today.getDate());
        setMonth(today.getMonth() + 1);
        setYear(today.getFullYear());
    }, []);

    const handleFormSubmit = () => {
        try {
            dateSchema.parse({ day, month, year });

            if (selectedDay === "") {
                setError("Please select a valid day.");
                return;
            }

            const date = formDate(day, month, year);
            if (date) {
                setSelectedDay("");
                setError(null);
            }
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(e.errors[0].message);
            }
        }
    };

    return (
        <View className="flex-1 p-6 bg-[#121212]">
            <Text className="font-bold text-4xl mt-3 text-[#fafafa]">Copy Day</Text>
            <Text className="text-2xl mt-3 mb-3 text-[#fafafa] font-semibold">Date</Text>
            <View className="flex-row">
                <TextInput
                    className="bg-[#202020] text-[#fafafa] p-5 rounded-lg mr-2 w-3/12 border border-[#2d2d2d]"
                    placeholder="DD"
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={(text) => setDay(Number(text))}
                    value={day.toString()}
                />
                <TextInput
                    className="bg-[#202020] text-[#fafafa] p-5 rounded-lg mx-2 w-3/12 border border-[#2d2d2d]"
                    placeholder="MM"
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={(text) => setMonth(Number(text))}
                    value={month.toString()}
                />
                <TextInput
                    className="bg-[#202020] text-[#fafafa] p-5 rounded-lg mx-2 w-3/12 border border-[#2d2d2d]"
                    placeholder="YYYY"
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={(text) => setYear(Number(text))}
                    value={year.toString()}
                />
            </View>

            <Text className="text-2xl text-[#fafafa] font-semibold my-3">Day</Text>
            <View className="mb-4 bg-[#202020] text-[#fafafa] rounded-md border border-[#2d2d2d]">
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
                onPress={handleFormSubmit}
            >
                <Text className="text-[#121212] text-lg text-center font-semibold">Copy</Text>
            </TouchableOpacity>

            {error && <Text className="text-red-500 text-lg mt-2">{error}</Text>}
        </View>
    );
};

export default CopyDay;
