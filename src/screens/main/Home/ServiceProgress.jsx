/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppColors from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import AppText from '../../../components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import ServiceStatus from '../../../components/ServiceStatus';
import OverallProgress from '../../../components/OverallProgress';
import LineBreak from '../../../components/LineBreak';
import ProfileCard from '../../../components/ProfileCard';
import JobTimeline from '../../../components/JobTimeline';
import { useNavigation } from '@react-navigation/native';

const ServiceProgress = () => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.navigate('ServiceComplete');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ServiceStatus
        middleTitle={'Service in Progress'}
        topContent={
          <View
            style={{
              backgroundColor: AppColors.WHITE,
              width: 100,
              height: 25,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AppText
              title={'In Progress'}
              textSize={1.6}
              textColor={AppColors.ThemeColor}
            />
          </View>
        }
        bottomContent={
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Icon
                name="clock-o"
                size={responsiveFontSize(2.2)}
                color={AppColors.BLACK}
              />
              <AppText
                title={'0:09'}
                textSize={1.7}
                textColor={AppColors.BLACK}
              />
            </View>
            <AppText
              title={'•'}
              textSize={1.8}
              textFontWeight
              textColor={AppColors.BLACK}
            />
            <AppText
              title={'Maria Santos'}
              textSize={1.8}
              textColor={AppColors.BLACK}
            />
          </View>
        }
      />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <OverallProgress numOfProgress="50%" />
      </View>

      <LineBreak space={2} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: AppColors.LIGHTGRAY,
            borderRadius: 20,
            paddingHorizontal: responsiveWidth(4),
            paddingVertical: responsiveHeight(2),
          }}
        >
          <AppText
            title={'Job Timeline'}
            textSize={2}
            textColor={AppColors.BLACK}
          />
          <LineBreak space={2} />

          <View>
            <JobTimeline />
          </View>
        </View>
      </View>

      <LineBreak space={1} />

      <View style={{ paddingHorizontal: responsiveWidth(1) }}>
        <ProfileCard chatBgColor={AppColors.chatBgColor} />
      </View>
    </SafeAreaView>
  );
};

export default ServiceProgress;
