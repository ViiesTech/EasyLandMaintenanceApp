/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppColors from '../../../utils/AppColors';
import Icon from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppText';
import { AppImages } from '../../../assets/images';

const AllDone = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
        <LineBreak space={4} />
        <View>
          <View
            style={{
              width: responsiveWidth(20),
              height: responsiveWidth(20),
              borderRadius: responsiveWidth(10),
              backgroundColor: AppColors.ThemeColor,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <Icon
              name={'check-circle'}
              size={responsiveFontSize(4.5)}
              color={AppColors.WHITE}
            />
          </View>
          <LineBreak space={1} />
          <AppText
            title={'All Done!'}
            textSize={2.5}
            textColor={AppColors.BLACK}
            textAlignment={'center'}
            textFontWeight
          />
          <LineBreak space={1} />
          <AppText
            title={'Your payment has been processed'}
            textSize={1.8}
            textColor={AppColors.GRAY}
            textAlignment={'center'}
          />
          <LineBreak space={4} />
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <AppText
                title={'Service Summary'}
                textSize={2}
                textColor={AppColors.BLACK}
              />
              <View
                style={{
                  backgroundColor: AppColors.lightGreen,
                  borderRadius: 10,
                  width: 90,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AppText
                  title={'Completed'}
                  textSize={1.6}
                  textColor={AppColors.darkGreen}
                />
              </View>
            </View>
            <LineBreak space={1} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}
              >
                <View
                  style={{
                    backgroundColor: AppColors.lightGreen,
                    width: responsiveWidth(15),
                    height: responsiveWidth(15),
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Feather
                    name={'star'}
                    size={responsiveFontSize(3.5)}
                    color={AppColors.green}
                  />
                </View>

                <View>
                  <AppText
                    title={'Garden Maintenance'}
                    textSize={2}
                    textColor={AppColors.BLACK}
                  />
                  <LineBreak space={0.5} />
                  <AppText
                    title={'with Maria Santos'}
                    textSize={1.8}
                    textColor={AppColors.GRAY}
                  />
                </View>
              </View>
              <View>
                <AppText
                  title={'$51'}
                  textSize={2}
                  textAlignment={'right'}
                  textColor={AppColors.BLACK}
                />
                <LineBreak space={0.5} />
                <AppText
                  title={'1-2 hours'}
                  textSize={1.8}
                  textAlignment={'right'}
                  textColor={AppColors.GRAY}
                />
              </View>
            </View>

            <LineBreak space={3} />

            <View
              style={{
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: AppColors.LIGHTGRAY,
                paddingTop: responsiveHeight(2),
                gap: 100,
              }}
            >
              <View>
                <AppText
                  title={'Yard Size'}
                  textSize={2}
                  textColor={AppColors.GRAY}
                  textAlignment={'center'}
                />
                <LineBreak space={0.5} />
                <AppText
                  title={'Medium'}
                  textSize={1.8}
                  textColor={AppColors.BLACK}
                  textAlignment={'center'}
                />
              </View>
              <View>
                <AppText
                  title={'Frequency'}
                  textSize={2}
                  textColor={AppColors.GRAY}
                  textAlignment={'center'}
                />
                <LineBreak space={0.5} />
                <AppText
                  title={'Weekly'}
                  textSize={1.8}
                  textColor={AppColors.BLACK}
                  textAlignment={'center'}
                />
              </View>
            </View>
          </View>
          <LineBreak space={4} />
          <View style={styles.card}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <Feather
                name={'camera'}
                size={responsiveFontSize(2.5)}
                color={AppColors.green}
              />
              <AppText
                title={'Before & After'}
                textSize={2}
                textColor={AppColors.BLACK}
              />
            </View>

            <LineBreak space={2} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ImageBackground
                source={AppImages.first_banner_bg}
                imageStyle={{ borderRadius: 20 }}
                style={{
                  width: responsiveWidth(40),
                  height: responsiveWidth(50),
                  paddingVertical: responsiveHeight(1.5),
                  paddingHorizontal: responsiveWidth(3),
                }}
              >
                <View style={styles.beforeAndAfterBg}>
                  <AppText
                    title={'Before'}
                    textSize={1.8}
                    textColor={AppColors.WHITE}
                  />
                </View>
              </ImageBackground>
              <ImageBackground
                source={AppImages.first_banner_bg}
                imageStyle={{ borderRadius: 20 }}
                style={{
                  width: responsiveWidth(40),
                  height: responsiveWidth(50),
                  paddingVertical: responsiveHeight(1.5),
                  paddingHorizontal: responsiveWidth(3),
                }}
              >
                <View style={styles.beforeAndAfterBg}>
                  <AppText
                    title={'After'}
                    textSize={1.8}
                    textColor={AppColors.WHITE}
                  />
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllDone;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
    paddingHorizontal: responsiveWidth(4),
    marginHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    borderRadius: 15,
  },
  beforeAndAfterBg: {
    backgroundColor: '#000000',
    width: 60,
    height: 30,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
