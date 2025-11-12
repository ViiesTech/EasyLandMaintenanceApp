/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import AppColors from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import { AppImages } from '../../../assets/images';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import { useNavigation } from '@react-navigation/native';

const IncomingCall = () => {
    const nav = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.ThemeColor,
      }}
    >
      <ImageBackground
        source={AppImages.animation}
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
        resizeMode="contain"
      >
        <View style={{ position: 'absolute', top: responsiveHeight(30) }}>
          <AppText
            title={'Incoming Call'}
            textColor={AppColors.WHITE}
            textSize={3.5}
            textAlignment={'center'}
            textFontWeight
          />
        </View>
        <Image
          source={AppImages.user}
          style={{ width: 160, height: 160, borderRadius: 100 }}
        />
        <View style={{ position: 'absolute', bottom: responsiveHeight(18) }}>
          <AppText
            title={'Leilani Angel'}
            textColor={AppColors.WHITE}
            textSize={2.5}
            textAlignment="center"
            textFontWeight
          />
          <LineBreak space={1} />
          <AppText
            title={'Your Rider Calling...'}
            textColor={AppColors.WHITE}
            textSize={2}
            textAlignment="center"
          />

          <LineBreak space={5} />

          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                backgroundColor: '#A6F2D8',
              }}
              onPress={() => nav.goBack()}
            >
              <FontAwesome6
                name="phone-slash"
                size={responsiveFontSize(2.5)}
                color={'#9C9E84'}
              />
            </TouchableOpacity>
            <Image source={AppImages.dotsLeft} />
            <TouchableOpacity
              style={{
                padding: 15,
                borderRadius: 100,
                backgroundColor: AppColors.WHITE,
              }}
            >
              <FontAwesome6
                name="phone"
                size={responsiveFontSize(4)}
                color={AppColors.ThemeColor}
              />
            </TouchableOpacity>
            <Image source={AppImages.dotsRight} />
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                backgroundColor: '#A6F2D8',
              }}
            >
              <Feather
                name="phone-call"
                size={responsiveFontSize(2.5)}
                color={AppColors.ThemeColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default IncomingCall;
