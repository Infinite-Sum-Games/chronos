
import { View, Text, StatusBar, ScrollView } from "react-native";
import React, { useEffect } from "react";
import ActivityTopBar from "@/components/activity-components/ActivityTopBar";
import "../../global.css";
import ActivityItemCard from "@/components/activity-components/ActivityItemCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useActivityStore } from "../../store/activityStore";


type Activity = {
  type: string;
  title: string;
  description: string;
  course: string;
  date: string;
};

// Helper function to group activities by date
const groupActivitiesByDate = (
  activities: {
    type: string;
    title: string;
    description: string;
    course: string;
    date: string;
  }[]
): { [key: string]: Activity[] } => {
  return activities.reduce(
    (groups: { [key: string]: Activity[] }, activity) => {
      const { date } = activity;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
      return groups;
    },
    {}
  );
};

// Helper function to format the date as 'Day, 10 Oct 2024'
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const Activity = () => {
  // Access the activities from Zustand store
  const { activities, setActivities } = useActivityStore();

  // Sort the activity data by date
  const sortedData = [...activities].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group activities by date
  const groupedActivities = groupActivitiesByDate(sortedData);

  useEffect(() => {
    // Fetch data from the backend
    const backendData = [
      {
        type: "Exam",
        title: "Midterm Exam",
        description:
          "Midterm Exam for the course. This exam will cover all the topics discussed in the first half of the semester, including object-oriented programming, data structures, and algorithms. Students are expected to have a thorough understanding of Java programming concepts and be able to apply them in solving complex problems.",
        course: "Java Programming",
        date: "2024-10-10",
      },
      {
        type: "Evaluation",
        title: "Assignment 1",
        description:
          "Evaluation for the course. This assignment will test the students' knowledge on the basics of Internet of Things (IoT), including sensors, actuators, and communication protocols. Students will be required to design and implement a simple IoT system using the concepts learned in class.",
        course: "Internet of Things",
        date: "2024-10-10",
      },
      {
        type: "Quiz",
        title: "Quiz 1",
        description:
          "Quiz for the course. This quiz will cover the fundamental concepts of Software Engineering, including software development life cycle, requirements engineering, and software design principles. Students should be prepared to answer both theoretical and practical questions.",
        course: "Software Engineering",
        date: "2024-10-10",
      },
      {
        type: "Assignment",
        title: "Assignment 2",
        description:
          "Assignment for the course. This assignment will focus on advanced mathematical concepts such as calculus, linear algebra, and probability theory. Students will be required to solve complex mathematical problems and demonstrate their understanding of the underlying principles.",
        course: "Mathematics",
        date: "2024-10-12",
      },
      {
        type: "Tutorial",
        title: "Tutorial 1",
        description:
          "Tutorial for the course. This tutorial will provide hands-on experience with computer science concepts such as programming, data structures, and algorithms. Students will work on practical exercises and projects to reinforce their understanding of the material covered in lectures.",
        course: "Computer Science",
        date: "2024-10-12",
      },
      {
        type: "Tutorial",
        title: "Lecture 1",
        description:
          "Lecture for the course. This lecture will introduce the fundamental concepts of data structures, including arrays, linked lists, stacks, and queues. Students will learn how to implement these data structures in Java and understand their applications in solving real-world problems.",
        course: "Data Structures",
        date: "2024-10-12",
      },
      {
        type: "Exam",
        title: "Workshop 1",
        description:
          "Workshop for the course. This workshop will focus on the practical applications of artificial intelligence (AI) techniques, including machine learning, natural language processing, and computer vision. Students will work on hands-on projects to apply the AI concepts learned in class.",
        course: "Artificial Intelligence",
        date: "2024-10-12",
      },
      {
        type: "Tutorial",
        title: "Seminar 1",
        description:
          "Seminar for the course. This seminar will cover advanced topics in machine learning, including deep learning, neural networks, and reinforcement learning. Students will have the opportunity to present their research findings and discuss the latest developments in the field of machine learning.",
        course: "Machine Learning",
        date: "2024-10-12",
      },
    ];

    setActivities(backendData);
  }, [setActivities]);

  return (
    <SafeAreaView className="flex-1 bg-background h-full">
      <ActivityTopBar />
      <ScrollView className="mb-4">
        <View className="flex flex-col">
          {Object.keys(groupedActivities).map((date, index) => (
            <View key={index} className="mb-4">
              <Text className="text-text text-xl font-semibold mb-2 mx-5">
                {formatDate(date)}
              </Text>
              {/* Activities under the date */}
              {groupedActivities[date].map((activity, idx) => (
                <ActivityItemCard
                  key={idx}
                  type={activity.type}
                  title={activity.title}
                  description={activity.description}
                  course={activity.course}
                  date={activity.date}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>

  );
};

export default Activity;
