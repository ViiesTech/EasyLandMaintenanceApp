/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { View, Image } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppText';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import { AppImages } from '../../assets/images';
import AppButton from '../../components/AppButton';

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
      }}
    >
      {slides.map((_, index) => (
        <View
          key={index}
          style={{
            width: index === currentIndex ? responsiveWidth(6) : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              index === currentIndex
                ? AppColors.ThemeColor
                : AppColors.lightThemeColor,
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
          textSize={1.7}
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

   const handleSkip = () => {
      sliderRef.current?.goToSlide(currentIndex + 2, true);
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
          <AppButton
            title={'Skip'}
            bgColor={AppColors.LIGHTGRAY}
            textColor={AppColors.GRAY}
            buttoWidth={45}
            handlePress={() => handleSkip()}
          />
          <AppButton
            title={'Next'}
            bgColor={AppColors.ThemeColor}
            buttoWidth={45}
            textColor={AppColors.BLACK}
            handlePress={() => handleNext()}
          />
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
          <AppButton
            title={'Previous'}
            bgColor={AppColors.LIGHTGRAY}
            textColor={AppColors.GRAY}
            buttoWidth={45}
            handlePress={() => handlePrev()}
          />
          <AppButton
            title={'Next'}
            bgColor={AppColors.ThemeColor}
            buttoWidth={45}
            textColor={AppColors.BLACK}
            handlePress={() => handleNext()}
          />
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
          <AppButton
            title={'Previous'}
            bgColor={AppColors.LIGHTGRAY}
            textColor={AppColors.GRAY}
            buttoWidth={45}
            handlePress={() => handlePrev()}
          />
          <AppButton
            title={'Continue'}
            bgColor={AppColors.ThemeColor}
            buttoWidth={45}
            textColor={AppColors.BLACK}
            handlePress={() => handleDone()}
          />
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
