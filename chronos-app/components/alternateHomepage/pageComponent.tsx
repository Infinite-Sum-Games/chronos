import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const lectures = [
  { id: 1, subject: "COA", score: 73.67, total: 100, remaining: 3 },
  { id: 2, subject: "DAA", score: 66.67, total: 100, remaining: 3 },
  { id: 3, subject: "Probability", score: 62.5, total: 100, remaining: 8 },
  { id: 4, subject: "Operating System", score: 62.5, total: 100, remaining: 8 },
];

const App = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Tue, 17 Dec 2024</Text>
        <Text style={styles.score}>77.78 | 100</Text>
      </View>

      
      <ScrollView>
        {lectures.map((lecture) => (
          <View key={lecture.id} style={styles.card}>
            <View style={styles.circle}>
              <Text style={styles.scoreText}>{lecture.score}</Text>
              <Text style={styles.totalText}>/ {lecture.total}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.subject}>{lecture.subject}</Text>
              {/* <Text style={styles.lectures}>Need to attend {lecture.remaining} lectures</Text> */}
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>✖</Text>
              
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  score: {
    color: "#4ADE80",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#1F2937",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4B5563",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  scoreText: {
    color: "#F87171",
    fontWeight: "bold",
    fontSize: 14,
  },
  totalText: {
    color: "#D1D5DB",
    fontSize: 10,
  },
  details: {
    flex: 1,
  },
  subject: {
    color: "#F9FAFB",
    fontSize: 16,
    fontWeight: "600",
  },
  lectures: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#EF4444",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;

// import React from "react";
// import { View, Text, TouchableOpacity, ScrollView } from "react-native";

// const lectures = [
//   { id: 1, subject: "Adv", score: 66.67, total: 80, remaining: 3 },
//   { id: 2, subject: "Software Engineering", score: 66.67, total: 80, remaining: 3 },
//   { id: 3, subject: "PoPL", score: 62.5, total: 80, remaining: 8 },
//   { id: 4, subject: "PoPL", score: 62.5, total: 80, remaining: 8 },
// ];

// const App = () => {
//   return (
//     <View className="flex-1 bg-black">
//       {/* Header */}
//       <View className="flex-row items-center justify-between px-4 py-3 bg-gray-900">
//         <Text className="text-white text-lg font-bold">Wed, 11 Dec 2024</Text>
//         <Text className="text-white text-lg font-bold">77.78 | 80</Text>
//       </View>

//       {/* Day Selection */}
//       <View className="flex-row items-center bg-green-900 px-4 py-2">
//         <Text className="text-red-400 mr-2 font-bold">Day </Text>
//         <Text className="text-white px-3">⭕ Clear</Text>
//         <Text className="text-white px-3">⚫ Off</Text>
//         <Text className="text-white px-3">❌ Miss</Text>
//         <Text className="text-white px-3">✔ Att</Text>
//       </View>

//       {/* Lecture Cards */}
//       <ScrollView className="mt-2">
//         {lectures.map((item) => (
//           <View
//             key={item.id}
//             className="bg-gray-800 rounded-lg p-4 mx-4 mb-4 flex-row justify-between items-center"
//           >
//             <View>
//               <View className="flex-row items-center mb-2">
//                 <Text className="text-red-400 text-lg font-bold mr-2">
//                   {item.score.toFixed(2)}
//                 </Text>
//                 <Text className="text-gray-400 text-sm">/ {item.total}</Text>
//               </View>
//               <Text className="text-white text-lg font-bold">{item.subject}</Text>
//               <Text className="text-gray-400">need to attend {item.remaining} lectures</Text>
//             </View>

//             {/* Action Buttons */}
//             <View className="flex-row">
//               <TouchableOpacity className="rounded-full bg-gray-600 p-2 mx-1">
//                 <Text className="text-white">🚫</Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="rounded-full bg-gray-600 p-2 mx-1">
//                 <Text className="text-white">➖</Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="rounded-full bg-red-500 p-2 mx-1">
//                 <Text className="text-white">❌</Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="rounded-full bg-gray-600 p-2 mx-1">
//                 <Text className="text-white">✔</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default App;
