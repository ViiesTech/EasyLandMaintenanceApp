/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
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
import RequestFormModal from '../../../components/RequestFormModal';
import { useNavigation } from '@react-navigation/native';

// Dummy popular services data
const DUMMY_POPULAR_SERVICES = [
  {
    _id: '1',
    title: 'Plant Selection',
    category: 'Plant Selection',
    description: 'Professional lawn mowing service',
    price: { startingCost: 50 },
    rating: { average: 4.5, count: 120 },
  },
  {
    _id: '2',
    title: 'Cleaning',
    category: 'Cleaning',
    description: 'Expert tree trimming and pruning',
    price: { startingCost: 75 },
    rating: { average: 4.8, count: 85 },
  },
  {
    _id: '3',
    title: 'Pest Control',
    category: 'Pest Control',
    description: 'Complete pest control solutions',
    price: { startingCost: 60 },
    rating: { average: 4.6, count: 95 },
  },
  {
    _id: '4',
    title: 'Irrigation Repair',
    category: 'Irrigation Repair',
    description: 'Expert Irrigation Repair and consultation',
    price: { startingCost: 40 },
    rating: { average: 4.7, count: 110 },
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

const bgColorMapping = {
  'Plant Selection': '#DCFCE7',
  'Cleaning': '#DBEAFE',
  'Pest Control': '#FFE2E2',
  'Irrigation Repair': '#CEFAFE',
  'Lawn Mowing': '#DCFCE7',
  'Tree Trimming': '#DBEAFE',
};

const Home = () => {
  const [location, setLocation] = useState('');
  const [visibleReqModal, setVisibleReqModal] = useState(false);
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigation();

  useEffect(() => {
    fetchPopularServices();
  }, []);

  const fetchPopularServices = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setPopularServices(DUMMY_POPULAR_SERVICES);
    } catch (error) {
      console.error('Error fetching popular services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <HomeHeader />
      <RequestFormModal
        visible={visibleReqModal}
        setVisible={setVisibleReqModal}
      />
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
          {loading ? (
            <View style={{ alignItems: 'center', paddingVertical: responsiveHeight(5) }}>
              <ActivityIndicator size="large" color={AppColors.ThemeColor} />
            </View>
          ) : (
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
                  onPress={() => nav.navigate("ServicesProfile", { service: item })}
                >
                  <View
                    style={{
                      backgroundColor: bgColorMapping[item.title] || item.bgColor || '#DCFCE7',
                      padding: 8,
                      borderRadius: 10,
                    }}
                  >
                    <SVGXml 
                      icon={iconMapping[item.title] || AppIcons.sezer} 
                      width={30} 
                      height={30} 
                    />
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
          )}
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
              handlePress={() => setVisibleReqModal(true)}
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
