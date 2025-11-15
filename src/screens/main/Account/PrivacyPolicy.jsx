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

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <HomeHeader homeHead={false} title="Privacy Policy" />

      <LineBreak space={2} />

      {/* Content */}
      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <AppText
            title="1. Information We Collect"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="We collect information you provide directly to us, such as when you create an account, book services, or contact us. This includes your name, email, phone number, address, and payment information."
            textSize={1}
            textColor={AppColors.GRAY}
          />
        </View>

        <LineBreak space={1.5} />

        <View style={styles.section}>
          <AppText
            title="2. How We Use Your Information"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="We use the information we collect to provide, maintain, and improve our services, process transactions, send transactional and promotional communications, and comply with legal obligations."
            textSize={1}
            textColor={AppColors.GRAY}
          />
        </View>

        <LineBreak space={1.5} />

        <View style={styles.section}>
          <AppText
            title="3. Data Security"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
            textSize={1}
            textColor={AppColors.GRAY}
          />
        </View>

        <LineBreak space={1.5} />

        <View style={styles.section}>
          <AppText
            title="4. Information Sharing"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="We do not share your personal information with third parties except as necessary to provide our services or as required by law."
            textSize={1}
            textColor={AppColors.GRAY}
          />
        </View>

        <LineBreak space={1.5} />

        <View style={styles.section}>
          <AppText
            title="5. Your Rights"
            textSize={1.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title="You have the right to access, update, or delete your personal information. Contact us to exercise these rights."
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

export default PrivacyPolicy;
