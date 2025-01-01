import { View, Text, StyleSheet } from 'react-native';
import { addDays, eachDayOfInterval, eachWeekOfInterval, subDays, format } from 'date-fns';
import React from 'react';
import PagerView from 'react-native-pager-view';

// Generate the dates for the last and next two weeks
const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 14),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: 1,
  }
).reduce((acc: Date[][], cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });

  acc.push(allDays);
  return acc;
}, []);

console.log(dates);

export const Slider: React.FC = () => {
  return (
    <PagerView style={styles.container}>
      {dates.map((week, i) => {
        return (
          <View key={i}>
            <View style={styles.row}>
              {week.map((day, j) => {
                const txt = format(day, 'EEEEE'); 

                return (
                  <View key={j}>
                    <Text>{txt}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center', 
  },
});

export default Slider;
