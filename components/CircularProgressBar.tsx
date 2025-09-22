import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, Filter, FeDropShadow } from 'react-native-svg';

interface CircularProgressBarProps {
  progress: number; // 0 to 100
  radius?: number;
  strokeWidth?: number;
  color?: string;
  animationDuration?: number; // in ms
  title?: string;
}

const CircularProgressBar = ({
  progress,
  radius = 100,
  strokeWidth = 20,
  color = '#4CAF50',
  animationDuration = 1000,
  title
}: CircularProgressBarProps) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * radius;


  const progressAnimation = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    progressAnimation();
  });



  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  return (
    <>
      {title && <View style={{ paddingVertical: 15 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>
          {title}
        </Text>
      </View>}
      <View style={styles.container}>
        <Svg height={(radius * 2)} width={(radius * 2)} viewBox={`0 0 ${(radius * 2)} ${(radius * 2)}`}>
          <Circle
            stroke="#E0E0E0"
            fill="none"
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            strokeWidth={strokeWidth}
          />
            <AnimatedCircle
            stroke="black"
            fill="none"
            opacity={0.2}
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-88"
            origin={`${radius}, ${radius}`}
          />
          <AnimatedCircle
            stroke={color}
            fill="none"
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${radius}, ${radius}`}
          />
        </Svg>
        <View style={styles.progressTextContainer}>
          <Text style={[styles.progressText, { fontSize: radius / 2 }]}>
            {progress}%
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTextContainer: {
    position: 'absolute',
  },
  progressText: {
    fontWeight: 'bold',
  },
});

export default CircularProgressBar;
