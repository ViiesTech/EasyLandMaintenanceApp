import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import LineBreak from '../../../components/LineBreak';
import AppColors from '../../../utils/AppColors';
import AppText from '../../../components/AppText';
import {
  responsiveWidth,
  responsiveHeight,
} from '../../../utils/Responsive_Dimensions';
import HomeHeader from '../../../components/HomeHeader';

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <HomeHeader homeHead={false} title="Terms & Conditions" />

      <LineBreak space={2} />

      {/* Content */}
      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <AppText
            title="1. Acceptance of Terms"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement."
            textSize={1}
            textColor={AppColors.GRAY}
          />
        </View>

        <LineBreak space={1.5} />

        <View style={styles.section}>
          <AppText
            title="2. User Responsibilities"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account."
            textSize={1}
            textColor={AppColors.GRAY}
          />
        </View>

        <LineBreak space={1.5} />

        <View style={styles.section}>
          <AppText
            title="3. Service Booking"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="When you book a service, you agree to pay the quoted amount and comply with the service terms. Cancellations must be made within the specified time frame."
            textSize={1}
            textColor={AppColors.GRAY}
          />
        </View>

        <LineBreak space={1.5} />

        <View style={styles.section}>
          <AppText
            title="4. Limitation of Liability"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="We are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the application or services."
            textSize={1}
            textColor={AppColors.GRAY}
          />
        </View>

        <LineBreak space={1.5} />

        <View style={styles.section}>
          <AppText
            title="5. Modification of Terms"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the application."
            textSize={1}
            textColor={AppColors.GRAY}
          />
        </View>

        <LineBreak space={1.5} />

        <View style={styles.section}>
          <AppText
            title="6. Governing Law"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the service is provided."
            textSize={1}
            textColor={AppColors.GRAY}
          />
        </View>

        <LineBreak space={3} />
      </View>
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
  section: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default TermsAndConditions;
