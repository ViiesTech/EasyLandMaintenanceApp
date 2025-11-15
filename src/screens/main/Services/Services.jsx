/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
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
import ApiService from '../../../services/api';

// Icon mapping for service categories
const iconMapping = {
  'Plant Selection': AppIcons.sezer,
  'Cleaning': AppIcons.star,
  'Pest Control': AppIcons.insect,
  'Irrigation Repair': AppIcons.drops,
  'Lawn Mowing': AppIcons.sezer,
  'Tree Trimming': AppIcons.star,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getServices();
      if (response.success) {
        setServices(response.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        setLoading(true);
        const response = await ApiService.getServices({ search: searchQuery });
        if (response.success) {
          setServices(response.data);
        }
      } catch (error) {
        console.error('Error searching services:', error);
      } finally {
        setLoading(false);
      }
    } else {
      fetchServices();
    }
  };
  const renderServiceCard = ({ item, index }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: item.bgColor || '#E8F5E9' }]}>
            <SVGXml icon={iconMapping[item.title] || AppIcons.sezer} width={25} height={25} />
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
              title={`$${item.price?.startingCost || 0}`}
              textSize={2}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
            <AppText
              title={'Starting cost'}
              textSize={1.7}
              textColor={AppColors.GRAY}
            />
          </View>
          <LineBreak space={0.5} />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <AppButton
                title={item.availability === 'high_demand' ? 'In High Demand' : 'Available'}
                buttoWidth={30}
                padding={5}
                textSize={1.5}
                textFontWeight={false}
                bgColor={item.availability === 'high_demand' ? AppColors.highDemand : AppColors.ThemeColor}
              />
            </View>
            <LineBreak space={0.5} />
            <View style={styles.buttonRow}>
              <AppButton
                title={item.rating?.average ? `★ ${item.rating.average.toFixed(1)}` : 'New Service'}
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
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <LineBreak space={2} />

      {loading ? (
        <View style={{ alignItems: 'center', marginTop: responsiveHeight(10) }}>
          <ActivityIndicator size="large" color={AppColors.ThemeColor} />
          <LineBreak space={2} />
          <AppText title="Loading services..." textColor={AppColors.GRAY} />
        </View>
      ) : (
        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
          <FlatList
            data={services}
            renderItem={renderServiceCard}
            keyExtractor={item => item._id}
            scrollEnabled={false}
            ListEmptyComponent={() => (
              <View style={{ alignItems: 'center', marginTop: responsiveHeight(10) }}>
                <AppText title="No services found" textColor={AppColors.GRAY} />
              </View>
            )}
            ListFooterComponent={<LineBreak space={8} />}
            contentContainerStyle={{ gap: responsiveHeight(1.5) }}
          />
        </View>
      )}

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
