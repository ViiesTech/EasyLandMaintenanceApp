/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import AppColors from '../utils/AppColors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import LineBreak from './LineBreak';

type Props = {
  numOfProgress?: string, // e.g. "85%" or "100%"
};

const ProgressBar = ({ numOfProgress = '100%' }: Props) => {
  const progress = useRef(new Animated.Value(0.65)).current; // start at 65%
  const [displayPercent, setDisplayPercent] = useState(65);

  useEffect(() => {
    // Convert numOfProgress (e.g. "85%") → numeric value (0.85)
    const targetProgress = parseInt(numOfProgress.replace('%', ''), 10) / 100;

    // Animate from current (0.65) → targetProgress
    Animated.timing(progress, {
      toValue: targetProgress,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Listen to progress updates for percentage display
    const listenerId = progress.addListener(({ value }) => {
      const percent = Math.round(value * 100);
      setDisplayPercent(percent);
    });

    // Cleanup
    return () => {
      progress.removeListener(listenerId);
    };
  }, [numOfProgress]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Overall Progress</Text>
        <Text style={styles.percentText}>{displayPercent}%</Text>
      </View>

      <LineBreak space={1} />

      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBarFill, { width: widthInterpolated }]} />
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(3),
    marginTop: responsiveHeight(4),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFontSize(2),
    color: AppColors.GRAY,
  },
  progressBarBackground: {
    width: '100%',
    height: 15,
    backgroundColor: '#CDCCD0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: AppColors.ThemeColor,
  },
  percentText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
    color: AppColors.ThemeColor,
  },
});
