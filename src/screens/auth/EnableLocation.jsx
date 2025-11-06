/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AuthHeader from '../../components/AuthHeader';
import AppColors from '../../utils/AppColors';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/icons';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';

const EnableLocation = () => {
  const nav = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.WHITE,
        alignItems: 'center',
      }}
    >
      <LineBreak space={10} />
      <AuthHeader pageHead="Hi, Nice to meet you!" />
      <LineBreak space={2} />
      <View
        style={{
          backgroundColor: AppColors.lightGreenColor,
          width: 60,
          height: 60,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SVGXml icon={AppIcons.location_green} width={30} height={30} />
      </View>
      <LineBreak space={2} />
      <AppText
        title={'Enable Location'}
        textSize={1.8}
        textColor={AppColors.BLACK}
        textAlignment={'center'}
      />
      <LineBreak space={3} />
      <AppText
        title={
          'We need your location to connect you with nearby service providers'
        }
        textSize={1.8}
        textColor={AppColors.LIGHTGRAY}
        textwidth={60}
        lineHeight={2.5}
        textAlignment={'center'}
      />
      <LineBreak space={3} />

      <AppButton
        title={'Use current location'}
        bgColor={AppColors.BLACK}
        handlePress={() => nav.navigate('CompleteYourProfile')}
      />
      <LineBreak space={2} />
      <TouchableOpacity onPress={() => nav.navigate('CompleteYourProfile')}>
        <AppText
          title={'Skip for now'}
          textSize={1.8}
          textColor={AppColors.red}
          textFontWeight
        />
      </TouchableOpacity>
      <LineBreak space={2} />
    </View>
  );
};

export default EnableLocation;
