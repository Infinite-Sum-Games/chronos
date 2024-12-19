import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Helper to calculate the current week
const getCurrentWeekDates = (offset: number) => {
  const today = new Date();
  today.setDate(today.getDate() + offset * 7);
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday as the start
  return Array.from({ length: 6 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { day: 'numeric' }),
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      year: date.getFullYear(),
    };
  });
};

type Task = {
  title: string;
  day: number;
  startTime: string;
  endTime: string;
  type: 'regular' | 'elective' | 'lab' | 'break';
  weekOffset: number;
};

const HomePage: React.FC = () => {
  const [weekOffset, setWeekOffset] = useState(0);

  const timeSlots = ['08:00', '08:50', '09:40', '10:30', '10:45', '11:35', '12:25', '01:15', '02:05', '02:55', '03:45', '04:35', '05:25'];
  const weekDates = getCurrentWeekDates(weekOffset); // Get current week's dates
  const breaks = ['10:30', '01:15']; // Fixed break times

  const tasks: Task[] = [
    { title: '23CSE212', day: 0, startTime: '09:40', endTime: '10:30', type: 'regular', weekOffset: 0 },
    { title: '23CSE213', day: 0, startTime: '10:45', endTime: '11:35', type: 'regular', weekOffset: 0 },
    { title: 'CIR', day: 2, startTime: '11:35', endTime: '12:25', type: 'lab', weekOffset: 0 },
    { title: '23MAT216', day: 3, startTime: '02:05', endTime: '02:55', type: 'elective', weekOffset: 0 },
  ];

  const getColorForType = (type: string) => {
    switch (type) {
      case 'regular':
        return '#6A5ACD'; // Blue for regular
      case 'elective':
        return '#8A2BE2'; // Violet for elective
      case 'lab':
        return '#FFD700'; // Yellow for lab
      case 'break':
        return '#8B0000'; // Deep Red for breaks
      default:
        return '#333';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setWeekOffset((prev) => prev - 1)}>
          <Text style={styles.navButton}>← Previous Week</Text>
        </TouchableOpacity>
        <Text style={styles.monthYear}>{weekDates[0].month} {weekDates[0].year}</Text>
        <TouchableOpacity onPress={() => setWeekOffset((prev) => prev + 1)}>
          <Text style={styles.navButton}>Next Week →</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header with synchronized scrolling */}
      <ScrollView horizontal={false}>
        <View>
          <ScrollView horizontal>
            <View>
              <View style={styles.headerRow}>
                <View style={styles.timeColumn}>
                  <Text style={styles.timeHeader}></Text>
                </View>
                {weekDates.map((day, index) => (
                  <View key={index} style={styles.dayColumnHeader}>
                    <Text style={styles.dayHeader}>{day.day}</Text>
                    <Text style={styles.dateHeader}>{day.date}</Text>
                  </View>
                ))}
              </View>

              {/* Table Content */}
              <ScrollView>
                {timeSlots.map((slot, slotIndex) => (
                  <View key={slotIndex} style={styles.row}>
                    <View style={styles.timeColumn}>
                      <Text style={styles.timeSlot}>{slot}</Text>
                    </View>
                    {weekDates.map((_, dayIndex) => {
                      const task = tasks.find((t) => t.day === dayIndex && t.startTime === slot && t.weekOffset === weekOffset);
                      const isBreak = breaks.includes(slot);
                      return (
                        <View key={dayIndex} style={styles.dayColumn}>
                          {task && (
                            <View style={[styles.taskTile, { backgroundColor: getColorForType(task.type) }]}>
                              <Text style={styles.taskText}>{task.title}</Text>
                            </View>
                          )}
                          {!task && isBreak && (
                            <View style={[styles.taskTile, { backgroundColor: getColorForType('break') }]}>
                              <Text style={styles.taskText}>Break</Text>
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  navButton: { color: '#6C63FF', fontSize: 16 },
  monthYear: { color: '#FFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  headerRow: { flexDirection: 'row', backgroundColor: '#1E1E1E', padding: 10 },
  timeColumn: { width: 80, alignItems: 'center', justifyContent: 'center' }, // Adjusted width
  timeHeader: { color: '#FFF', fontWeight: 'bold' },
  dayColumnHeader: { width: 100, alignItems: 'center', justifyContent: 'center' }, // Adjusted for table alignment
  dayHeader: { color: '#FFF', fontWeight: 'bold' },
  dateHeader: { color: '#AAA', fontSize: 14 },
  row: { flexDirection: 'row', height: 70 },
  timeSlot: { color: '#AAA' },
  dayColumn: { width: 100, justifyContent: 'center', alignItems: 'center' }, // Adjusted width for alignment
  taskTile: {
    width: '85%',
    height: '80%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskText: { color: '#FFF', fontSize: 12 },
});

export default HomePage;
