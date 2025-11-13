/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';

const GradientProgressBar = ({ progress = 0.6 }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress, // from 0 to 1
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBar}>
        <Animated.View style={[styles.fillContainer, { width: widthInterpolated }]}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']} // yellow → orange
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientFill}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default GradientProgressBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  backgroundBar: {
    width: '90%',
    height: responsiveHeight(2),
    backgroundColor: '#FFF',
    borderRadius: 50,
    overflow: 'hidden',
    elevation: 2,
  },
  fillContainer: {
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  gradientFill: {
    flex: 1,
  },
});
