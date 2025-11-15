/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import HomeHeader from '../../../components/HomeHeader';
import LineBreak from '../../../components/LineBreak';
import AppColors from '../../../utils/AppColors';
import AppText from '../../../components/AppText';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppImages } from '../../../assets/images';
import SVGXml from '../../../components/SVGXML';
import { AppIcons } from '../../../assets/icons';
import AppButton from '../../../components/AppButton';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import ApiService from '../../../services/api';

const iconMapping = {
  'Plant Selection': AppIcons.sezer,
  'Cleaning': AppIcons.star,
  'Pest Control': AppIcons.insect,
  'Irrigation Repair': AppIcons.drops,
  'Lawn Mowing': AppIcons.sezer,
  'Tree Trimming': AppIcons.star,
};

const tasksData = [
  {
    id: 1,
    title: 'Full Service Plant Selection',
    image: AppImages.first_banner_bg,
    icon: 'leaf',
    status: 'ongoing',
  },
  {
    id: 2,
    title: 'Cleaning',
    image: AppImages.first_banner_bg,
    icon: 'star',
    status: 'ongoing',
  },
  {
    id: 3,
    title: 'Plant Selection',
    icon: AppIcons.sezer,
    status: 'completed',
    subtitle: 'Your Services',
    price: '$49',
    date: '04:45 PM, Dec 10 2020',
    bgColor: AppColors.lightGreen,
    iconColor: AppColors.ThemeColor,
    rating: null,
  },
  {
    id: 4,
    title: 'Plant Cleaning',
    icon: AppIcons.star,
    status: 'completed',
    subtitle: 'Your Services',
    price: '$450',
    date: '00:00 AM, May 05 2020',
    bgColor: '#E3F2FD',
    iconColor: '#1976D2',
    rating: 5,
  },
  {
    id: 5,
    title: 'Pest Control',
    icon: AppIcons.insect,
    status: 'completed',
    subtitle: 'Your Services',
    price: '$49',
    date: '04:45 PM, Dec 10 2020',
    bgColor: '#FFEBEE',
    iconColor: '#D32F2F',
    rating: null,
  },
  {
    id: 6,
    title: 'Garden Design',
    icon: AppIcons.star,
    status: 'history',
    subtitle: 'Your Services',
    price: '$65',
    date: '10:30 AM, Nov 15 2020',
    bgColor: '#E0F2F1',
    iconColor: '#00897B',
    rating: null,
  },
];

const detailsData = [
  {
    label: 'Time',
    value: '04:30 PM, Aug 14 2020',
    color: AppColors.ThemeColor,
  },
  { label: 'Places', value: 'Commercial', color: AppColors.BLACK },
  {
    label: 'Type',
    value: 'Large (5,000 - 10,000 sq ft)',
    color: AppColors.BLACK,
  },
  { label: 'Status Lawn', value: 'Once a week', color: AppColors.BLACK },
  {
    label: 'Options',
    value: 'Moving, trimming & edging, Fertilizing and overseeding',
    color: AppColors.BLACK,
  },
];

const Tasks = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [selectedTask, setSelectedTask] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'completed', label: 'Completed' },
    { id: 'history', label: 'History' },
  ];

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getMyBookings(activeTab);
      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const response = await ApiService.cancelBooking(bookingId, 'User requested cancellation');
              if (response.success) {
                Alert.alert('Success', 'Booking cancelled successfully');
                fetchBookings();
              }
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const renderTaskCard = ({ item }) => (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() => setSelectedTask(item)}
    >
      <Image source={AppImages.first_banner_bg} style={styles.taskImage} />
      <View style={styles.cardTitleContainer}>
        <AppText
          title={item.service?.title || 'Service'}
          textSize={1.5}
          textColor={AppColors.BLACK}
          textFontWeight
        />
      </View>
    </TouchableOpacity>
  );

  const renderCompletedCard = ({ item }) => (
    <View style={styles.completedCard}>
      <View style={styles.completedCardContent}>
        <View style={styles.completedCardLeft}>
          <View
            style={[
              styles.completedIconContainer,
              { backgroundColor: item.service?.bgColor || AppColors.lightGreen },
            ]}
          >
            <SVGXml 
              icon={iconMapping[item.service?.title] || AppIcons.sezer} 
              width={25} 
              height={25} 
            />
          </View>
        </View>
        <View style={styles.completedCardMiddle}>
          <AppText
            title={item.service?.title || 'Service'}
            textSize={1.5}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.6} />
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <AppText
                title={'Your Service'}
                textSize={1.2}
                textColor={AppColors.GRAY}
              />
              <View>
                <StarRatingDisplay
                  rating={item.rating || 0}
                  starSize={responsiveFontSize(2)}
                />
              </View>
            </View>
          </View>
          <LineBreak space={0.6} />
          <View style={styles.completedPriceRow}>
            <AppText
              title={'Total Price'}
              textSize={1.2}
              textColor={AppColors.GRAY}
            />
            <AppText
              title={`$${item.pricing?.totalPrice || 0}`}
              textSize={1.5}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </View>
          <LineBreak space={0.4} />
          <View style={styles.completedDateRow}>
            <AppText
              title={'Date Time'}
              textSize={1.2}
              textColor={AppColors.GRAY}
            />
            <AppText
              title={new Date(item.bookingDetails?.date).toLocaleDateString()}
              textSize={1.2}
              textColor={AppColors.GRAY}
            />
          </View>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', marginTop: responsiveHeight(1) }}>
        <AppButton
          title={'Re-booking'}
          textSize={1.5}
          buttoWidth={25}
          padding={10}
          textColor={AppColors.BLACK}
          bgColor={AppColors.ThemeColor}
        />
      </View>
    </View>
  );

  if (selectedTask) {
    return (
      <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setSelectedTask(null)}>
            <FontAwesome name="arrow-left" size={20} color={AppColors.BLACK} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
        </View>

        <LineBreak space={1.5} />

        <View style={styles.detailContainer}>
          <View style={styles.detailTitleRow}>
            <View
              style={[
                styles.detailIconContainer,
                { backgroundColor: AppColors.lightGreen },
              ]}
            >
              <FontAwesome
                name="leaf"
                size={responsiveFontSize(2.5)}
                color={AppColors.ThemeColor}
              />
            </View>
            <AppText
              title={selectedTask.title}
              textSize={1.8}
              textColor={AppColors.BLACK}
              textFontWeight
            />
          </View>

          <LineBreak space={2} />

          {detailsData.map((item, index) => (
            <View key={index} style={styles.detailRow}>
              <AppText
                title={item.label}
                textSize={1.4}
                textColor={AppColors.GRAY}
              />
              <View style={styles.detailValueContainer}>
                <AppText
                  title={item.value}
                  textSize={1.6}
                  textColor={item.color}
                  textFontWeight
                />
              </View>
            </View>
          ))}

          <View style={styles.divider} />

          <LineBreak space={1} />

          <View style={styles.priceRow}>
            <AppText
              title={'Total Price'}
              textSize={1.7}
              textColor={AppColors.BLACK}
              textFontWeight
            />
            <AppText
              title={'$49'}
              textSize={1.8}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </View>

          <LineBreak space={1.5} />

          <View style={styles.statusRow}>
            <AppText
              title={'Status'}
              textSize={1.7}
              textColor={AppColors.BLACK}
              textFontWeight
            />
            <AppText
              title={'Waiting Accept'}
              textSize={1.7}
              textColor={'#FF9500'}
              textFontWeight
            />
          </View>
        </View>

        <LineBreak space={3} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: responsiveHeight(10),
      }}
      scrollEnabled={true}
      nestedScrollEnabled
    >
      <HomeHeader homeHead={false} title={'Tasks'} />

      <LineBreak space={1.5} />

      <View style={styles.tabsContainer}>
        <View style={styles.tabsContent}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <AppText
                title={tab.label}
                textSize={1.6}
                textColor={
                  activeTab === tab.id ? AppColors.WHITE : AppColors.GRAY
                }
                textFontWeight={activeTab === tab.id}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <LineBreak space={2} />

      <View style={styles.cardsContainer}>
        {loading ? (
          <View style={{ alignItems: 'center', marginTop: responsiveHeight(10) }}>
            <ActivityIndicator size="large" color={AppColors.ThemeColor} />
            <LineBreak space={2} />
            <AppText title="Loading bookings..." textColor={AppColors.GRAY} />
          </View>
        ) : bookings.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: responsiveHeight(10) }}>
            <AppText title="No bookings found" textColor={AppColors.GRAY} />
          </View>
        ) : activeTab === 'ongoing' ? (
          <FlatList
            data={bookings}
            renderItem={renderTaskCard}
            keyExtractor={item => item._id}
            scrollEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: responsiveWidth(3),
              paddingRight: responsiveWidth(4),
            }}
          />
        ) : (
          <FlatList
            data={bookings}
            renderItem={renderCompletedCard}
            keyExtractor={item => item._id}
            scrollEnabled={false}
            contentContainerStyle={{
              gap: responsiveHeight(1.5),
            }}
          />
        )}
      </View>

      <LineBreak space={2} />

      {activeTab === 'ongoing' && (
        <View style={styles.detailsBottomContainer}>
          <View style={styles.detailsCard}>
            <View style={styles.detailCardHeader}>
              <View
                style={[
                  styles.detailIconContainer,
                  { backgroundColor: AppColors.lightGreen },
                ]}
              >
                <SVGXml icon={AppIcons.sezer} width={20} height={20} />
              </View>
              <AppText
                title={'Full Service Plant Selection'}
                textSize={1.8}
                textColor={AppColors.BLACK}
                textFontWeight
              />
            </View>

            <LineBreak space={1} />

            <View style={styles.divider} />

            <LineBreak space={1} />

            {detailsData.map((item, index) => (
              <View key={index} style={styles.detailRow}>
                <AppText
                  title={item.label}
                  textSize={1.5}
                  textColor={AppColors.GRAY}
                />
                <View style={styles.detailValueContainer}>
                  <AppText
                    title={item.value}
                    textSize={1.6}
                    textColor={item.color}
                    textAlignment={'right'}
                  />
                </View>
              </View>
            ))}

            <LineBreak space={1.5} />

            <View style={styles.priceRow}>
              <AppText
                title={'Total Price'}
                textSize={1.7}
                textColor={AppColors.BLACK}
                textFontWeight
              />
              <AppText
                title={'$49'}
                textSize={1.8}
                textColor={AppColors.ThemeColor}
                textFontWeight
              />
            </View>

            <LineBreak space={1.5} />

            <View style={styles.divider} />

            <LineBreak space={1.5} />

            <View style={styles.statusRow}>
              <AppText
                title={'Status'}
                textSize={1.7}
                textColor={AppColors.BLACK}
                textFontWeight
              />
              <AppText
                title={'Waiting Accept'}
                textSize={1.7}
                textColor={'#FF9500'}
                textFontWeight
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: responsiveWidth(4),
  },
  tabsContent: {
    gap: 0,
    backgroundColor: AppColors.LIGHTGRAY,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 0,
    backgroundColor: AppColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: AppColors.ThemeColor,
  },
  cardsContainer: {
    paddingHorizontal: responsiveWidth(4),
  },
  columnWrapper: {
    gap: responsiveWidth(3),
    marginBottom: responsiveHeight(1.5),
  },
  taskCard: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
    overflow: 'hidden',
    width: responsiveWidth(50),
    minWidth: responsiveWidth(50),
  },
  taskImage: {
    width: '100%',
    height: responsiveHeight(12),
    backgroundColor: AppColors.LIGHTGRAY,
  },
  cardTitleContainer: {
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1),
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(1),
  },
  detailContainer: {
    paddingHorizontal: responsiveWidth(4),
    backgroundColor: AppColors.WHITE,
  },
  detailTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(3),
  },
  detailIconContainer: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.LIGHTGRAY,
    marginVertical: responsiveHeight(1),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsBottomContainer: {
    paddingHorizontal: responsiveWidth(4),
  },
  detailsCard: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
    padding: responsiveWidth(4),
  },
  detailCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(3),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: responsiveHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: AppColors.LIGHTGRAY,
    gap: responsiveWidth(2),
  },
  detailValueContainer: {
    alignItems: 'flex-end',
    maxWidth: responsiveWidth(50),
  },
  completedCard: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
    padding: responsiveWidth(2.5),
  },
  completedCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(4),
  },
  completedCardLeft: {
    justifyContent: 'center',
  },
  completedIconContainer: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedCardMiddle: {
    flex: 1,
  },
  completedPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: responsiveWidth(0.6),
  },
  rebookButton: {
    backgroundColor: AppColors.ThemeColor,
    paddingHorizontal: responsiveWidth(2.8),
    paddingVertical: responsiveHeight(0.9),
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
});

export default Tasks;
