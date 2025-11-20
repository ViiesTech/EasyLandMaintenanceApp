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

// Dummy services data
const DUMMY_SERVICES = [
  {
    _id: '1',
    title: 'Lawn Mowing',
    category: 'Lawn Mowing',
    description: 'Professional lawn mowing service for residential and commercial properties',
    price: { startingCost: 50 },
    rating: { average: 4.5, count: 120 },
    availability: 'available',
    bgColor: '#DCFCE7',
  },
  {
    _id: '2',
    title: 'Tree Trimming',
    category: 'Tree Trimming',
    description: 'Expert tree trimming and pruning to maintain healthy trees',
    price: { startingCost: 75 },
    rating: { average: 4.8, count: 85 },
    availability: 'available',
    bgColor: '#DBEAFE',
  },
  {
    _id: '3',
    title: 'Pest Control',
    category: 'Pest Control',
    description: 'Complete pest control solutions for your property',
    price: { startingCost: 60 },
    rating: { average: 4.6, count: 95 },
    availability: 'available',
    bgColor: '#FFE2E2',
  },
  {
    _id: '4',
    title: 'Plant Selection',
    category: 'Plant Selection',
    description: 'Expert plant selection and consultation services',
    price: { startingCost: 40 },
    rating: { average: 4.7, count: 110 },
    availability: 'available',
    bgColor: '#DCFCE7',
  },
  {
    _id: '5',
    title: 'Irrigation Repair',
    category: 'Irrigation Repair',
    description: 'Professional irrigation system repair and maintenance',
    price: { startingCost: 80 },
    rating: { average: 4.9, count: 75 },
    availability: 'available',
    bgColor: '#CEFAFE',
  },
  {
    _id: '6',
    title: 'Garden Cleaning',
    category: 'Cleaning',
    description: 'Complete garden cleaning and maintenance service',
    price: { startingCost: 55 },
    rating: { average: 4.4, count: 100 },
    availability: 'available',
    bgColor: '#DBEAFE',
  },
  {
    _id: '7',
    title: 'Landscape Design',
    category: 'Landscaping',
    description: 'Professional landscape design and planning',
    price: { startingCost: 100 },
    rating: { average: 4.9, count: 60 },
    availability: 'available',
    bgColor: '#E0F2F1',
  },
  {
    _id: '8',
    title: 'Fertilization',
    category: 'Lawn Care',
    description: 'Complete lawn fertilization service',
    price: { startingCost: 45 },
    rating: { average: 4.3, count: 90 },
    availability: 'available',
    bgColor: '#DCFCE7',
  },
];

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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setServices(DUMMY_SERVICES);
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Filter services based on search query
        const filtered = DUMMY_SERVICES.filter(service =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setServices(filtered);
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
            <SVGXml icon={iconMapping[item.title] || AppIcons.sezer} width={30} height={30} />
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
                title={'In High Demand'}
                buttoWidth={30}
                padding={5}
                textSize={1.5}
                textFontWeight={false}
                bgColor={ AppColors.highDemand}
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
