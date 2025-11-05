/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AppColors from '../../utils/AppColors';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from '../../utils/Responsive_Dimensions';

const SplashFullScreen = () => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.replace('OnBoarding');
    }, 1500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.ThemeColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: 'BevanItalic',
          fontSize: responsiveFontSize(4),
          textAlign: 'center',
        }}
      >
        EASY LAND
      </Text>
      <Text
        style={{
          fontFamily: 'BevanItalic',
          fontSize: responsiveFontSize(4),
          textAlign: 'center',
        }}
      >
        MAINTENANCE
      </Text>
    </View>
  );
};

export default SplashFullScreen;
