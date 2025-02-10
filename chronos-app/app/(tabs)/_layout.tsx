import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          justifyContent: "center",
          backgroundColor: "white",
          height: 45,
        },
        // tabBarActiveTintColor: '#3572EF',
        // tabBarInactiveTintColor: '#FFFFFF',
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="home"
              size={24}
              style={{ color, textAlign: "center" }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Activity"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-clock"
              size={24}
              style={{ color, textAlign: "center" }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Admin"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="user-circle"
              size={24}
              style={{ color, textAlign: "center" }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
