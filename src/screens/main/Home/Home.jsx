/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AppColors from '../../../utils/AppColors';
import HomeHeader from '../../../components/HomeHeader';
import LineBreak from '../../../components/LineBreak';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import AppTextInput from '../../../components/AppTextInput';
import SVGXml from '../../../components/SVGXML';
import { AppIcons } from '../../../assets/icons';
import { AppImages } from '../../../assets/images';
import AppText from '../../../components/AppText';
import AppButton from '../../../components/AppButton';
import HomeBanner from '../../../components/HomeBanner';
import LinearGradient from 'react-native-linear-gradient';
import PlusIcon from 'react-native-vector-icons/Feather';

const popularServices = [
  { id: 1, icon: AppIcons.sezer, title: 'Plant selection', bgColor: '#DCFCE7' },
  { id: 2, icon: AppIcons.star, title: 'Cleaning', bgColor: '#DBEAFE' },
  {
    id: 3,
    icon: AppIcons.insect,
    title: 'Plant selection',
    bgColor: '#FFE2E2',
  },
  {
    id: 4,
    icon: AppIcons.drops,
    title: 'Irrigation Repair',
    bgColor: '#CEFAFE',
  },
];

const Home = () => {
  const [location, setLocation] = useState('');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <HomeHeader />
      <LineBreak space={2} />
      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <AppTextInput
          inputPlaceHolder={'Current Location'}
          borderWidth={-1}
          containerBg={`#EFEFEF`}
          borderRadius={100}
          inputHeight={5}
          value={location}
          onChangeText={text => setLocation(text)}
          logo={<SVGXml icon={AppIcons.location_gray} width={20} height={20} />}
        />
        <LineBreak space={2} />

        <HomeBanner
          image={AppImages.first_banner_bg}
          title="Get instant help for your outdoor needs"
          buttonTitle="Book Now"
        />

        <LineBreak space={2} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            title={'Popular Services'}
            textSize={2}
            textFontWeight
            textColor={AppColors.BLACK}
          />

          <TouchableOpacity>
            <AppText
              title={'See all'}
              textSize={1.8}
              textColor={AppColors.GRAY}
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={1} />
        <View>
          <FlatList
            data={popularServices}
            horizontal
            contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: AppColors.LIGHTGRAY,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(21),
                  height: responsiveHeight(12),
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: item.bgColor,
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <SVGXml icon={item.icon} width={30} height={30} />
                </View>
                <LineBreak space={1} />
                <AppText
                  title={item.title}
                  textSize={1}
                  textAlignment={'center'}
                  textColor={AppColors.BLACK}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <LineBreak space={2} />

        <HomeBanner
          image={AppImages.second_banner_bg}
          title="You have multiple promos"
          buttonTitle="Terms apply"
        />

        <LineBreak space={6} />
      </View>
      <View style={{ backgroundColor: AppColors.ThemeColor }}>
        <View style={{ position: 'relative', top: responsiveHeight(-4) }}>
          <LinearGradient
            colors={['#fff', '#4EE1B9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              height: responsiveHeight(10),
              borderWidth: 1,
              borderColor: AppColors.WHITE,
              shadowColor: '#4EE1B9',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
              marginVertical: responsiveHeight(1),
              paddingHorizontal: responsiveWidth(5),
            }}
          >
            <AppButton
              title={'Request Form'}
              bgColor={AppColors.WHITE}
              textColor={AppColors.ThemeColor}
              buttoWidth={80}
              leftIcon={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 5,
                    width: 20,
                    height: 20,
                    borderWidth: 2,
                    borderColor: '#C6F7E2',
                  }}
                >
                  <PlusIcon name="plus" size={15} color="#2DD8A3" />
                </View>
              }
            />
          </LinearGradient>
        </View>
      </View>
      <LineBreak space={2} />
    </ScrollView>
  );
};

export default Home;
