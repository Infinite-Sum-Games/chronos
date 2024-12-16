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
  type: string;
  title: string;
  description: string;
  course: string;
  date: string;
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
    <View className="bg-background rounded-full">
      <MaterialIcons
        name={iconMap[type]}
        size={20}
        color="#61FFFF"
        style={{ padding: 12 }}
      />
    </View>
  );
};

const ActivityItemCard = (props: ActivityItemCardProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex flex-col bg-cardBackground rounded-lg mx-4 my-2">
      <View className="flex flex-row rounded-lg overflow-hidden">
        {/* First part */}
        <View className="flex-1 rounded-tl-lg rounded-bl-lg p-4">
          <View className="flex flex-row items-center">
            {getIcon(props.type)}
            <View className="ml-4 flex-col">
              <Text className="text-cardText text-xl font-semibold">
                {props.title}
              </Text>
              <Text className="text-green-500 text-base font-semibold">
                {props.course}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex justify-center items-center bg-[#61FFFF] rounded-tr-lg rounded-br-lg ">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="p-4"
          >
            <ChevronRight color="#27282d" />
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
            className="bg-background p-6 rounded-t-2xl max-h-[75%] border border-[#333] w-full"
            style={{ height: height * 0.6 }}
          >
            <View className="flex flex-row justify-between">
              {/* Title*/}
              <Text className="text-3xl font-semibold text-text mb-4">
                {props.title}
              </Text>

              {/* Close button */}
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color="#61FFFF" size={24} />
              </TouchableOpacity>
            </View>

            {/* Type */}
            <Text className="text-lg text-text mb-4">
              <Text className="font-semibold">Type: </Text>
              {props.type}
            </Text>

            {/* Date */}
            <View className="flex flex-row">
              <Calendar color="#61FFFF" />
              <Text className="text-lg text-text mb-4 ml-2">{props.date}</Text>
            </View>

            {/* Course */}
            <Text className="text-lg text-text mb-4">
              <CourseBadge course={props.course} />
            </Text>

            {/* Description */}
            <View>
              <Text className="text-lg text-text font-semibold mb-2">
                Description
              </Text>
              <ScrollView className="max-h-96">
                <Text className="text-lg text-text">{props.description}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActivityItemCard;
