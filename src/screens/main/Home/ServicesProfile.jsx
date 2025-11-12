/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppColors from '../../../utils/AppColors';
import { AppImages } from '../../../assets/images';
import LeftIcon from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import LineBreak from '../../../components/LineBreak';
import ServiceProfileBottomSheet from '../../../components/ServiceProfileBottomSheet';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../components/AppText';
import ConfirmBookingModal from '../../../components/ConfirmBookingModal';
import BookingSuccessModal from '../../../components/BookingSuccessModal';
import CancelRequestModal from '../../../components/CancelRequestModal';

const ServicesProfile = () => {
  const nav = useNavigation();
  const refRBSheet = useRef();
  const [isOpenServicesProfiles, setIsOpenServicesProfiles] = useState(false);
  const [visibleConfirmBookingModal, setVisibleConfirmBookingModal] =
    useState(false);
  const [visibleBookingSuccessModal, setVisibleBookingSuccessModal] =
    useState(false);
  const [visibleCancelReqModal, setVisibleCancelReqModal] = useState(false);

  useEffect(() => {
    refRBSheet?.current?.open();
  }, [refRBSheet]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.WHITE,
        paddingBottom: responsiveHeight(2),
      }}
    >
      <ImageBackground source={AppImages.bg} style={{ flex: 1 }}>
        <LineBreak space={2} />
        <View
          style={{
            paddingHorizontal: responsiveWidth(4),
            flexDirection: 'row',
          }}
        >
        {!isOpenServicesProfiles && !visibleConfirmBookingModal ? <TouchableOpacity
            style={{
              backgroundColor: AppColors.WHITE,
              elevation: 5,
              width: 40,
              height: 40,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => nav.goBack()}
          >
            <LeftIcon
              name="chevron-left"
              size={responsiveFontSize(3)}
              color={AppColors.LIGHTGRAY}
            />
          </TouchableOpacity> : null}

          {isOpenServicesProfiles && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AppText
                title={'Services Profiles'}
                textSize={2}
                textTransform={'uppercase'}
                textAlignment={'center'}
                textFontWeight
                textColor={AppColors.BLACK}
              />
            </View>
          )}
        </View>
        <ServiceProfileBottomSheet
          refRBSheet={refRBSheet}
          setIsOpenServicesProfiles={setIsOpenServicesProfiles}
          viewDetailsHandlePress={() => {
            refRBSheet.current.close();
            setVisibleConfirmBookingModal(true);
          }}
        />
        <ConfirmBookingModal
          visible={visibleConfirmBookingModal}
          setVisible={setVisibleConfirmBookingModal}
          confirmBookingHandlePress={() => {
            refRBSheet.current.close();
            setVisibleBookingSuccessModal(true);
          }}
        />

        <BookingSuccessModal
          visible={visibleBookingSuccessModal}
          setVisible={setVisibleBookingSuccessModal}
          cancelHandlePress={() => {
            setVisibleBookingSuccessModal(false);
          }}
          doneHandlePress={() => {
            setVisibleBookingSuccessModal(false);
            setVisibleCancelReqModal(true);
          }}
        />

        <CancelRequestModal
          visible={visibleCancelReqModal}
          setVisible={setVisibleCancelReqModal}
          confirmCancelReqHandlePress={() => nav.navigate('ServiceProgress')}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ServicesProfile;
