/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AppColors from '../../../utils/AppColors';
import HomeHeader from '../../../components/HomeHeader';
import { responsiveWidth } from '../../../utils/Responsive_Dimensions';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';

const Services = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <HomeHeader homeHead={false} title={'Services'} />

      <LineBreak space={2} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppTextInput
          inputPlaceHolder={'Searching...'}
          borderWidth={-1}
          borderRadius={25}
          containerBg={AppColors.LIGHTGRAY}
        />
      </View>
    </ScrollView>
  );
};

export default Services;
