/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Animated, View, TouchableOpacity, Image } from 'react-native';
import AppColors from '../../utils/AppColors';
import { AppImages } from '../../assets/images';
import { responsiveWidth } from '../../utils/Responsive_Dimensions';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const bounceValue = useState(new Animated.Value(0))[0];
  const nav = useNavigation();

  useEffect(() => {
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 2,
      tension: 150,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      nav.replace('SplashFullScreen');
    }, 1500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{
          alignItems: 'center',
          gap: 15,
          transform: [{ scale: bounceValue }],
        }}
      >
        <TouchableOpacity>
          <Image
            source={AppImages.roundedImg}
            style={{
              width: responsiveWidth(45),
              height: responsiveWidth(45),
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Splash;
