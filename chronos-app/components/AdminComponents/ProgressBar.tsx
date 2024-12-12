import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const ProgressBar = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const [progressText, setProgressText] = useState(0);

  useEffect(() => {
   
    Animated.timing(progress, {
      toValue: 75,
      duration: 2000,
      useNativeDriver: false,
    }).start();
    const listener = progress.addListener(({ value }) => {
      setProgressText(Math.round(value));
    });

    return () => {
      progress.removeListener(listener); 
    };
  }, [progress]);

  const animatedWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'], 
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { width: animatedWidth }]} />
      <Text style={styles.text}>{progressText}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  bar: {
    height: 20,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgressBar;
