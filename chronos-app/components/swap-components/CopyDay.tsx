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
    const [selectedDay, setSelectedDay] = useState(-1); 
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

            
            if (selectedDay === -1) {
                setError("Please select a valid day.");
                return;
            }

          
            const date = formDate(day, month, year);
            if (date) {
                setSelectedDay(-1); 
                setError(null); 
            }
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(e.errors[0].message); 
            }
        }
    };

    return (
        <View className="flex-1 p-2 bg-background ">
            <Text className="font-bold text-4xl mx-4 mt-3 text-text">Copy Day</Text>
            <Text className="text-2xl mt-3 mb-3 mx-4 text-text font-semibold">Date</Text>
            <View className="flex-row">
                <TextInput
                    className="bg-[#61FFFF] text-[#27282d] p-4 rounded-lg ml-4 mr-2 w-3/12"
                    placeholder="DD"
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={(text) => setDay(Number(text))}
                    value={day.toString()}
                />
                <TextInput
                    className="bg-[#61FFFF] text-[#27282d] p-3 rounded-lg mx-2 w-3/12"
                    placeholder="MM"
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={(text) => setMonth(Number(text))}
                    value={month.toString()}
                />
                <TextInput
                    className="bg-[#61FFFF] text-[#27282d] p-3 rounded-lg mx-2 w-3/12"
                    placeholder="YYYY"
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={(text) => setYear(Number(text))}
                    value={year.toString()}
                />
            </View>

            <Text className="text-2xl text-text font-semibold my-3 mx-4">Day</Text>
            <View
                style={{
                    borderRadius: 10, 
                    overflow: 'hidden', 
                    backgroundColor: '#61FFFF', 
                    marginHorizontal: 16,
                    height: 55, 
                    width: 250,
                }}
            >
                <Picker
                    selectedValue={selectedDay}
                    onValueChange={(itemValue) => setSelectedDay(itemValue)}
                    style={{
                        height: 55, 
                        width: 250, 
                        padding: 12, 
                        color: "#27282d"
                    }}
                >
                    <Picker.Item label="Select a day" value={-1} />
                    <Picker.Item label="Sunday" value={0} />
                    <Picker.Item label="Monday" value={1} />
                    <Picker.Item label="Tuesday" value={2} />
                    <Picker.Item label="Wednesday" value={3} />
                    <Picker.Item label="Thursday" value={4} />
                    <Picker.Item label="Friday" value={5} />
                    <Picker.Item label="Saturday" value={6} />
                </Picker>
            </View>

            <TouchableOpacity
                className="bg-[#61FFFF] p-4 rounded-lg mt-6 mx-4"
                onPress={handleFormSubmit}
            >
                <Text className="text-[#27282d] text-lg text-center">Copy</Text>
            </TouchableOpacity>

            {error && <Text className="text-red-500 text-lg mx-4 mt-2">{error}</Text>} 
        </View>
    );
};

export default CopyDay;
