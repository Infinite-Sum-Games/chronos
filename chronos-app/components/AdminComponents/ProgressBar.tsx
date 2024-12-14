import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const ProgressBar = ({ start = 0, end = 100, duration = 2000, color = '#3b9c4d' }) => {
  const progress = useRef(new Animated.Value(start)).current;
  const [progressText, setProgressText] = useState(start);
  useEffect(() => {
    Animated.timing(progress, {
      toValue: end,
      duration,
      useNativeDriver: false,
    }).start();
    const listener = progress.addListener(({ value }) => {
      setProgressText(Math.round(value));
    });

    return () => {
      progress.removeListener(listener);
    };
  }, [progress, end, duration]);

  const animatedWidth = progress.interpolate({
    inputRange: [start, end],
    outputRange: ['0%', '70%'],
  });
  return (
    <View style={styles.wrapper}>
        <View style={styles.container}>
        <Animated.View style={[styles.bar, { width: animatedWidth, backgroundColor: color }]} />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{start}%</Text>
          <Text style={styles.infoText}>{progressText}%</Text>
          <Text style={styles.infoText}>{end}%</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    margin: 20,
  },
  container: {
    width: '100%',
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bar: {
    height: '100%',
    borderRadius: 15,
  },
  infoContainer: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  infoText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
});

export default ProgressBar;
