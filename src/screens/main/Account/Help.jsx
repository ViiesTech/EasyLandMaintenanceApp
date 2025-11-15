import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LineBreak from '../../../components/LineBreak';
import AppColors from '../../../utils/AppColors';
import AppText from '../../../components/AppText';
import {
  responsiveWidth,
  responsiveHeight,
} from '../../../utils/Responsive_Dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeHeader from '../../../components/HomeHeader';

const Help = ({ navigation }) => {
  const helpItems = [
    {
      id: 1,
      title: 'How to book a service?',
      description: 'Learn how to book landscaping services in easy steps.',
    },
    {
      id: 2,
      title: 'How to track my order?',
      description: 'Track your service booking status in real-time.',
    },
    {
      id: 3,
      title: 'How to cancel a booking?',
      description: 'Cancel your service booking anytime.',
    },
    {
      id: 4,
      title: 'Payment methods available?',
      description: 'Explore different payment options.',
    },
    {
      id: 5,
      title: 'How to contact support?',
      description: 'Get in touch with our customer support team.',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <HomeHeader homeHead={false} title="Help" />

      <LineBreak space={2} />

      {/* Help Items */}
      <View style={styles.contentContainer}>
        {helpItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.helpCard}>
            <View style={styles.cardContent}>
              <AppText
                title={item.title}
                textSize={1.3}
                textColor={AppColors.BLACK}
                textFontWeight
              />
              <LineBreak space={0.5} />
              <AppText
                title={item.description}
                textSize={1}
                textColor={AppColors.GRAY}
              />
            </View>
            <FontAwesome
              name="chevron-right"
              size={18}
              color={AppColors.GRAY}
            />
          </TouchableOpacity>
        ))}
      </View>

      <LineBreak space={3} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    paddingHorizontal: responsiveWidth(4),
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    marginBottom: responsiveHeight(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginRight: responsiveWidth(2),
  },
});

export default Help;
