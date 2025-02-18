import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Calendar, ChevronRight, X } from "lucide-react-native";
import CourseBadge from "./CourseBadge";

// Get screen height to set max height dynamically
const { height } = Dimensions.get("window");

interface ActivityItemCardProps {
  courseId: string;
  activityType: string;
  date: string;
  time: string;
  description: string;
}

interface IconMap {
  [key: string]: string;
}

const iconMap: IconMap = {
  Exam: "description",
  Evaluation: "check-circle",
  Quiz: "quiz",
  Assignment: "assignment-turned-in",
  Tutorial: "school",
};

// Function to return the correct icon based on activity type
const getIcon = (type: keyof IconMap) => {
  return (
    <View className="bg-[#121212] rounded-full">
      <MaterialIcons
        name={iconMap[type]}
        size={20}
        color="#3fcf8e"
        style={{ padding: 12 }}
      />
    </View>
  );
};

const ActivityItemCard = (props: ActivityItemCardProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex flex-col bg-[#202020] rounded-lg mx-4 my-2">
      <View className="flex flex-row rounded-lg overflow-hidden">
        {/* First part */}
        <View className="flex-1 rounded-tl-lg rounded-bl-lg p-4">
          <View className="flex flex-row items-center">
            {getIcon(props.activityType)}
            <View className="ml-4 flex-col">
              <Text className="text-[#fafafa] text-xl font-semibold">
                {props.activityType}
              </Text>
              <Text className="text-[#3fcf8e] text-base font-semibold">
                {props.courseId}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex justify-center items-center bg-[#3fcf8e] rounded-tr-lg rounded-br-lg">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="p-4"
          >
            <ChevronRight color="#121212" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal to display full description */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end items-center">
          <View
            className="bg-[#121212] p-6 rounded-t-2xl max-h-[75%] border border-[#333] w-full"
            style={{ height: height * 0.6 }}
          >
            <View className="flex flex-row justify-between">
              {/* Title*/}
              <Text className="text-3xl font-semibold text-[#fafafa] mb-4">
                {props.activityType}
              </Text>

              {/* Close button */}
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color="#3fcf8e" size={24} />
              </TouchableOpacity>
            </View>

            {/* Type */}
            <Text className="text-lg text-[#fafafa] mb-4">
              <Text className="font-semibold">Type: </Text>
              {props.activityType}
            </Text>

            {/* Date */}
            <View className="flex flex-row">
              <Calendar color="#3fcf8e" />
              <Text className="text-lg text-[#fafafa] mb-4 ml-2">{props.date}</Text>
            </View>

            {/* Course */}
            <Text className="text-lg text-[#fafafa] mb-4">
              <CourseBadge course={props.courseId} />
            </Text>

            {/* Description */}
            <View>
              <Text className="text-lg text-[#fafafa] font-semibold mb-2">
                Description
              </Text>
              <ScrollView className="max-h-96">
                <Text className="text-lg text-[#fafafa]">{props.description}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActivityItemCard;
