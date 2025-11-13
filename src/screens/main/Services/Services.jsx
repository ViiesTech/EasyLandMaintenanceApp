import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AppColors from '../../../utils/AppColors';
import HomeHeader from '../../../components/HomeHeader';

const Services = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <HomeHeader />
      <Text>Services</Text>
    </ScrollView>
  );
};

export default Services;
