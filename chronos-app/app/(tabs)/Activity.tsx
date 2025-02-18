import { View, Text, StatusBar, ScrollView } from "react-native";
import React, { useEffect } from "react";
import ActivityTopBar from "@/components/activity-components/ActivityTopBar";
import "../../global.css";
import ActivityItemCard from "@/components/activity-components/ActivityItemCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useActivityStore } from "../../store/activityStore";

interface Activity {
  courseId: string;
  activityType: string;
  date: string;
  time: string;
  description: string;
}

// Helper function to group activities by date
const groupActivitiesByDate = (
  activities: {
    courseId: string;
    activityType: string;
    date: string;
    time: string;
    description: string;
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const Activity = () => {
  const { activities, setActivities } = useActivityStore();
  const sortedData = [...activities].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const groupedActivities = groupActivitiesByDate(sortedData);

  useEffect(() => {
    const backendData = [
      {
        courseId: "23CSE101",
        activityType: "Assignment",
        date: "2022-07-01",
        time: "12:00 PM",
        description: "Complete Assignment 1",
      },
      {
        courseId: "23CCE404",
        activityType: "Exam",
        date: "2022-07-01",
        time: "2:00 PM",
        description: "Complete Exam 1",
      },
      {
        courseId: "23CSE204",
        activityType: "Quiz",
        date: "2022-07-02",
        time: "10:00 AM",
        description: "Complete Quiz 1",
      },
      {
        courseId: "19ECE201",
        activityType: "Evaluation",
        date: "2022-07-03",
        time: "9:00 AM",
        description: "Complete Evaluation 1",
      },
      {
        courseId: "23CSE202",
        activityType: "Tutorial",
        date: "2022-07-03",
        time: "2:00 PM",
        description: "Complete Tutorial 1",
      }
    ];

    setActivities(backendData);
  }, [setActivities]);

  return (
    <SafeAreaView className="flex-1 bg-[#121212] h-full">
      <ActivityTopBar />
      <ScrollView className="mb-4">
        <View className="flex flex-col">
          {Object.keys(groupedActivities).map((date, index) => (
            <View key={index} className="mb-4">
              <Text className="text-[#fafafa] text-xl font-semibold mb-2 mx-5">
                {formatDate(date)}
              </Text>
              {/* Activities under the date */}
              {groupedActivities[date].map((activity, idx) => (
                <ActivityItemCard
                  key={idx}
                  activityType={activity.activityType}
                  description={activity.description}
                  courseId={activity.courseId}
                  date={activity.date}
                  time={activity.time}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Activity;
