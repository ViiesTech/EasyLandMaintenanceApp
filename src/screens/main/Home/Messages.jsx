/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import AppColors from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import LeftIcon from 'react-native-vector-icons/Feather';
import AppText from '../../../components/AppText';
import { AppImages } from '../../../assets/images';
import { useNavigation } from '@react-navigation/native';
import ChatComp from '../../../components/ChatComp';
import { SafeAreaView } from 'react-native-safe-area-context';

const Messages = () => {
  const nav = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <View
        style={{
          backgroundColor: AppColors.ThemeColor,
          height: responsiveHeight(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: responsiveWidth(4),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => nav.goBack()}>
            <LeftIcon
              name="chevron-left"
              size={responsiveFontSize(4)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>
          <AppText
            title={'Gregory Smith'}
            textSize={3}
            textColor={AppColors.WHITE}
            textFontWeight
          />
        </View>

        <View>
          <Image
            source={AppImages.user}
            style={{ width: 45, height: 45, borderRadius: 100 }}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ChatComp />
      </View>
    </SafeAreaView>
  );
};

export default Messages;
