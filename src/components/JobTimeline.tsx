/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';

const JobTimeline = () => {
  const steps = [
    { title: 'Landscaper Arrived', time: '10:05 AM', completed: true },
    { title: 'Job Started', time: '10:10 AM', completed: true },
    { title: 'In Progress', time: '10:25 AM', completed: true },
    { title: 'Job Complete', time: '', completed: false },
  ];

  return (
    <View>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const nextCompleted = steps[index + 1]?.completed;

        return (
          <View key={index} style={styles.row}>
            {/* Timeline Section */}
            <View style={styles.timeline}>
              {/* Line Above */}
              {index !== 0 && (
                <View
                  style={[
                    styles.line,
                    {
                      top: 0,
                      backgroundColor: step.completed ? '#6EE7B7' : AppColors.WHITE,
                    },
                  ]}
                />
              )}

              {/* Circle */}
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: step.completed ? '#34D399' : '#E5E7EB',
                  },
                ]}
              >
                <Icon
                  name={"check-circle"}
                  size={responsiveFontSize(2.5)}
                  color={step.completed ? '#FFFFFF' : '#9CA3AF'}
                />
              </View>

              {/* Line Below */}
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor: nextCompleted ? '#6EE7B7' : '#6EE7B7',
                    },
                  ]}
                />
              )}
            </View>

            {/* Text Section */}
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  { color: step.completed ? '#111827' : '#9CA3AF' },
                ]}
              >
                {step.title}
              </Text>
              <Text
                style={[
                  styles.time,
                  { color: step.completed ? '#6B7280' : '#D1D5DB' },
                ]}
              >
                {step.time}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default JobTimeline;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    gap: 15,
  },
  timeline: {
    width: responsiveWidth(10),
    alignItems: 'center',
    position: 'relative',
    marginVertical: responsiveHeight(1.5)
  },
  line: {
    position: 'absolute',
    width: 2,
    height: responsiveHeight(8),
    zIndex: -1,
  },
  circle: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginVertical: responsiveHeight(1.5),
  },
  title: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
  },
  time: {
    fontSize: responsiveFontSize(1.6),
  },
});
