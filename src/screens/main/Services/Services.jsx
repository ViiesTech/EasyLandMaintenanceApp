/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import AppColors from '../../../utils/AppColors';
import HomeHeader from '../../../components/HomeHeader';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import AppText from '../../../components/AppText';
import AppButton from '../../../components/AppButton';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SVGXml from '../../../components/SVGXML';
import { AppIcons } from '../../../assets/icons';

const servicesData = [
  {
    id: 1,
    title: 'Plant Selection',
    price: '$49',
    subtitle: 'Starting cost',
    icon: 'leaf',
    bgColor: '#E8F5E9',
    iconColor: '#00A63E',
  },
  {
    id: 2,
    title: 'Cleaning',
    price: '$45',
    subtitle: 'Starting cost',
    icon: 'star',
    bgColor: '#E3F2FD',
    iconColor: '#1976D2',
  },
  {
    id: 3,
    title: 'Pest Control',
    price: '$45',
    subtitle: 'Starting cost',
    icon: 'bug',
    bgColor: '#FFEBEE',
    iconColor: '#D32F2F',
  },
  {
    id: 4,
    title: 'Irrigation Repair',
    price: '$55',
    subtitle: 'Starting cost',
    icon: 'tint',
    bgColor: '#CEFAFE',
    iconColor: '#00897B',
  },
  {
    id: 5,
    title: 'Pest Control',
    price: '$45',
    subtitle: 'Starting cost',
    icon: 'bug',
    bgColor: '#FFEBEE',
    iconColor: '#D32F2F',
  },
];

const Services = () => {
  const renderServiceCard = ({ item, index }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
          {index == 0 ? (
            <SVGXml icon={AppIcons.sezer} width={25} height={25} />
          ) : (
            <FontAwesome
              name={item.icon}
              size={responsiveFontSize(4)}
              color={item.iconColor}
            />
          )}
        </View>

        <View style={styles.textContainer}>
          <AppText
            title={item.title}
            textSize={2}
            textColor={AppColors.BLACK}
          />
          <LineBreak space={0.5} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <AppText
              title={item.price}
              textSize={2}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
            <AppText
              title={item.subtitle}
              textSize={1.7}
              textColor={AppColors.GRAY}
            />
          </View>
          <LineBreak space={0.5} />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <AppButton
                title={'In High Demand'}
                buttoWidth={30}
                padding={5}
                textSize={1.5}
                textFontWeight={false}
                bgColor={AppColors.highDemand}
              />
            </View>
            <LineBreak space={0.5} />
            <View style={styles.buttonRow}>
              <AppButton
                title={'Discount Available'}
                buttonBg={AppColors.purple_light}
                buttoWidth={30}
                padding={5}
                textSize={1.5}
                textFontWeight={false}
                bgColor={AppColors.discountColor}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <HomeHeader homeHead={false} title={'Services'} />

      <LineBreak space={2} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppTextInput
          logo={
            <Feather
              name="search"
              size={responsiveFontSize(2.2)}
              color={AppColors.ThemeColor}
            />
          }
          inputPlaceHolder={'Searching...'}
          borderWidth={-1}
          borderRadius={25}
          containerBg={'#EFEFEF'}
        />
      </View>

      <LineBreak space={2} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <FlatList
          data={servicesData}
          renderItem={renderServiceCard}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          ListFooterComponent={<LineBreak space={8} />}
          contentContainerStyle={{ gap: responsiveHeight(1.5) }}
        />
      </View>

      <LineBreak space={5} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
    padding: responsiveWidth(4),
    marginBottom: responsiveHeight(0.5),
  },
  cardContent: {
    flexDirection: 'row',
    gap: responsiveWidth(3),
    marginBottom: responsiveHeight(1.5),
  },
  iconContainer: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
  },
  buttonContainer: {
    gap: responsiveHeight(0.5),
    flexDirection: 'row',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(2),
  },
});

export default Services;
