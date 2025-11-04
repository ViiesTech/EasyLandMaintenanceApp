/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppText';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import Feather from 'react-native-vector-icons/Feather';
import { AppImages } from '../../assets/images';

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const navigation = useNavigation();

  const slides = [
    {
      key: 1,
      title: 'Welcome to Easy Land Maintenance',
      text: 'Your outdoor service partner',
      image: AppImages.step_one,
    },
    {
      key: 2,
      title: 'Choose Your Ride',
      text: 'Delivering excellence in every season',
      image: AppImages.step_two,
    },
    {
      key: 3,
      title: 'Trusted rides, lower costs',
      text: 'Where quality meets reliability',
      image: AppImages.step_three,
    },
  ];

  const renderDots = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: responsiveHeight(3),
      }}
    >
      {slides.map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              index === currentIndex ? AppColors.darkBlue : AppColors.DARKGRAY,
            marginHorizontal: responsiveWidth(1),
          }}
        />
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View>
      <Image
        source={item.image}
        style={{
          height: responsiveHeight(50),
          width: responsiveWidth(100),
          alignSelf: 'center',
          resizeMode: 'cover',
        }}
      />
      <LineBreak space={2} />
      {renderDots()}
      <LineBreak space={5} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppText
          title={item.title}
          textColor={AppColors.GRAY}
          textSize={2}
          textFontWeight
        />
        <LineBreak space={1} />
        <AppText
          title={item.text}
          textColor={AppColors.BLACK}
          textSize={3.5}
          lineHeight={4}
          textFontWeight
        />
      </View>
      <LineBreak space={7} />
    </View>
  );

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      sliderRef.current?.goToSlide(currentIndex + 1, true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sliderRef.current?.goToSlide(currentIndex - 1, true);
    }
  };

  const handleDone = () => {
    navigation.replace('Login');
  };

  const renderCustomButtons = () => {
    if (currentIndex === 0) {
      return (
        <View
          style={{
            paddingVertical: responsiveHeight(3),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
            }}
          />
          <TouchableOpacity
            onPress={() => handleNext()}
            style={{
              backgroundColor: AppColors.BTNCOLOURS,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}
          >
            <Feather
              name="arrow-right"
              size={responsiveFontSize(4)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>
        </View>
      );
    }

    if (currentIndex === 1) {
      return (
        <View
          style={{
            paddingVertical: responsiveHeight(3),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            onPress={() => handlePrev()}
            style={{
              borderWidth: 1,
              borderColor: AppColors.PEACHCOLOUR,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              elevation: 10,
              backgroundColor: AppColors.WHITE,
            }}
          >
            <Feather
              name="arrow-left"
              size={responsiveFontSize(4)}
              color={AppColors.BLACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNext()}
            style={{
              backgroundColor: AppColors.BTNCOLOURS,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}
          >
            <Feather
              name="arrow-right"
              size={responsiveFontSize(4)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>
        </View>
      );
    }

    if (currentIndex === 2) {
      return (
        <View
          style={{
            paddingVertical: responsiveHeight(3),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            onPress={() => handlePrev()}
            style={{
              borderWidth: 1,
              borderColor: AppColors.PEACHCOLOUR,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              elevation: 10,
              backgroundColor: AppColors.WHITE,
            }}
          >
            <Feather
              name="arrow-left"
              size={responsiveFontSize(4)}
              color={AppColors.BLACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNext()}
            style={{
              backgroundColor: AppColors.BTNCOLOURS,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}
          >
            <Feather
              name="arrow-right"
              size={responsiveFontSize(4)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>
        </View>
      );
    }

    if (currentIndex === 3) {
      return (
        <View
          style={{
            paddingVertical: responsiveHeight(3),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            onPress={() => handlePrev()}
            style={{
              borderWidth: 1,
              borderColor: AppColors.PEACHCOLOUR,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              elevation: 10,
              backgroundColor: AppColors.WHITE,
            }}
          >
            <Feather
              name="arrow-left"
              size={responsiveFontSize(4)}
              color={AppColors.BLACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDone()}
            style={{
              backgroundColor: AppColors.BTNCOLOURS,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}
          >
            <Feather
              name="arrow-right"
              size={responsiveFontSize(4)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };
  return (
    <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={renderItem}
        onSlideChange={index => setCurrentIndex(index)}
        showNextButton={false}
        showSkipButton={false}
        showDoneButton={false}
        dotStyle={{ display: 'none' }}
      />
      {renderCustomButtons()}
    </View>
  );
};

export default OnBoarding;
