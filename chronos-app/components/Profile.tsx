import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

// Types
type ElectiveType = 'free' | 'professional';
type Elective = {
    id: number;
    courseId: string;
    courseName: string;
    electiveType: ElectiveType;
    electiveNum: number;
};

// Mock Data
const COURSES = [
    { id: 'CS101', name: 'Introduction to Programming' },
    { id: 'CS201', name: 'Data Structures' },
    { id: 'CS301', name: 'Algorithms' },
];

const AVAILABLE_ELECTIVES = [
    { id: 'EL101', name: 'Web Development' },
    { id: 'EL102', name: 'Mobile App Development' },
    { id: 'EL103', name: 'Cloud Computing' },
    { id: 'EL104', name: 'Artificial Intelligence' },
    { id: 'EL105', name: 'Cybersecurity' },
    { id: 'EL106', name: 'Database Systems' },
    { id: 'EL107', name: 'Software Engineering' },
    { id: 'EL108', name: 'Computer Networks' },
];

export default function ProfileScreen() {
    const [userElectives, setUserElectives] = useState<Elective[]>([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initializeEmptyElectives();
    }, []);

    // will be removed in the next PR
    const initializeEmptyElectives = () => {
        const initialElectives: Elective[] = [
            ...Array(2).fill(null).map((_, i) => ({
                id: i,
                courseId: '',
                courseName: '',
                electiveType: 'free' as ElectiveType,
                electiveNum: i + 1
            })),
            ...Array(6).fill(null).map((_, i) => ({
                id: i + 2,
                courseId: '',
                courseName: '',
                electiveType: 'professional' as ElectiveType,
                electiveNum: i + 1
            }))
        ];

        setUserElectives(initialElectives);
        setIsLoading(false);
    };

    // logic to handle elective change (will change in the next PR)
    const handleElectiveChange = async (value: string, index: number) => {
        const newElectives = [...userElectives];
        const elective = AVAILABLE_ELECTIVES.find(e => e.id === value);

        if (elective) {
            // Check for duplicates
            const isDuplicate = userElectives.some((el, i) => 
                i !== index && 
                el.courseId === value && 
                el.electiveType === newElectives[index].electiveType
            );

            if (isDuplicate) {
                Alert.alert('Error', 'This elective is already selected in this category');
                return;
            }

            newElectives[index] = {
                ...newElectives[index],
                courseId: elective.id,
                courseName: elective.name,
            };

            setUserElectives(newElectives);
            setHasChanges(true);
        }
    };

    // will be updated in the next PR
    const saveChanges = () => {
        setIsLoading(true);
        setTimeout(() => {
            Alert.alert('Success', 'Changes saved successfully');
            setHasChanges(false);
            setIsLoading(false);
        }, 500);
    };

    const discardChanges = () => {
        setIsLoading(true);
        initializeEmptyElectives(); // Reset to initial state
        Alert.alert('Info', 'Changes discarded');
        setHasChanges(false);
        setIsLoading(false);
    };

    return (
        <ScrollView className="bg-[#121212] p-4">
            {/* Profile Header */}
            <View className="items-center mb-6">
                <View className="w-20 h-20 rounded-full bg-[#297050] justify-center items-center mb-3">
                    <MaterialIcons name="person" size={40} color="#fafafa" />
                </View>
                <Text className="text-2xl font-bold text-[#fafafa] mb-1">John Doe</Text>
                {/* <Text className="text-lg text-[#3fcf8e]">Computer Science</Text> */}
            </View>

            {/* Courses Section */}
            <View className="mb-6">
                <Text className="text-xl font-bold text-[#fafafa] mb-4">Core Courses</Text>
                {COURSES.map(course => (
                    <View key={course.id} className="flex-row p-3 bg-[#202020] rounded-lg mb-2">
                        <Text className="text-[#3fcf8e] font-bold mr-3">{course.id}</Text>
                        <Text className="text-[#fafafa] flex-1">{course.name}</Text>
                    </View>
                ))}
            </View>

            {/* Electives Section */}
            <View className="mb-6">
                <Text className="text-xl font-bold text-[#fafafa] mb-4">Electives</Text>

                {/* Chosen Electives Summary */}
                <View className="bg-[#1e1e1e] rounded-xl p-4 mb-6">
                    <Text className="text-[#3fcf8e] mb-2">Selected Electives</Text>
                    {userElectives.filter(e => e.courseId).map((elective) => (
                        <View key={`chosen-${elective.id}`} className="flex-row items-center mb-2 bg-[#202020] rounded-lg p-3">
                            <View className="bg-[#297050] px-3 py-1 rounded-lg mr-3">
                                <Text className="text-[#fafafa] text-xs font-bold">
                                    {elective.electiveType === 'free' ? 'Free' : 'Prof'} {elective.electiveNum}
                                </Text>
                            </View>
                            <Text className="text-[#fafafa] flex-1">{elective.courseName}</Text>
                        </View>
                    ))}
                    {userElectives.filter(e => e.courseId).length === 0 && (
                        <Text className="text-[#666666] italic text-center p-3">No electives selected yet</Text>
                    )}
                </View>

                {/* Free Electives */}
                {/* <Text className="text-[#3fcf8e] mt-4 mb-2">Free Electives</Text> */}
                {userElectives.filter(e => e.electiveType === 'free').map((elective, index) => (
                    <View key={`free-${index}`} className="mb-3">
                        <Text className="text-[#fafafa] mb-1">Free Elective {elective.electiveNum}</Text>
                        <View className="bg-[#202020] rounded-lg overflow-hidden">
                            <Picker
                                selectedValue={elective.courseId}
                                style={{ color: '#fafafa' }}
                                dropdownIconColor="#fafafa"
                                onValueChange={(value) => handleElectiveChange(value, elective.id)}
                            >
                                <Picker.Item label="Select an elective" value="" />
                                {AVAILABLE_ELECTIVES.map(e => (
                                    <Picker.Item key={e.id} label={e.name} value={e.id} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                ))}

                {/* Professional Electives */}
                {/* <Text className="text-[#3fcf8e] mt-4 mb-2">Professional Electives</Text> */}
                {userElectives.filter(e => e.electiveType === 'professional').map((elective, index) => (
                    <View key={`prof-${index}`} className="mb-3">
                        <Text className="text-[#fafafa] mb-1">Professional Elective {elective.electiveNum}</Text>
                        <View className="bg-[#202020] rounded-lg overflow-hidden">
                            <Picker
                                selectedValue={elective.courseId}
                                style={{ color: '#fafafa' }}
                                dropdownIconColor="#fafafa"
                                onValueChange={(value) => handleElectiveChange(value, elective.id)}
                            >
                                <Picker.Item label="Select an elective" value="" />
                                {AVAILABLE_ELECTIVES.map(e => (
                                    <Picker.Item key={e.id} label={e.name} value={e.id} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                ))}
            </View>

            {/* Action Buttons */}
            {hasChanges && (
                <View className="flex-row justify-between mt-6 mb-8">
                    <TouchableOpacity className="flex-1 p-4 rounded-lg bg-[#3fcf8e] items-center mx-2" onPress={saveChanges}>
                        <Text className="text-[#fafafa] font-bold">Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 p-4 rounded-lg bg-[#202020] items-center mx-2" onPress={discardChanges}>
                        <Text className="text-[#fafafa] font-bold">Discard Changes</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}
