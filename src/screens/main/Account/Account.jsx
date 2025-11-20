import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
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
import HomeHeader from '../../../components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';

const Account = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: 1,
      icon: 'user-o',
      label: 'Account',
      bgColor: AppColors.ThemeColor,
      navigate: 'EditAccount',
    },
    {
      id: 2,
      icon: 'credit-card',
      label: 'Payment Methods',
      bgColor: AppColors.ThemeColor,
      navigate: 'AddNewPaymentMethod',
    },
    {
      id: 3,
      icon: 'bell-o',
      label: 'Notifications',
      hasToggle: true,
      bgColor: AppColors.ThemeColor,
    },
    {
      id: 4,
      icon: 'headphones',
      label: 'Help',
      bgColor: AppColors.ThemeColor,
      navigate: 'Help',
    },
    {
      id: 5,
      icon: 'lock',
      label: 'Privacy Policy',
      bgColor: AppColors.ThemeColor,
      navigate: 'PrivacyPolicy',
    },
    {
      id: 6,
      icon: 'exclamation-circle',
      label: 'Terms & Conditions',
      bgColor: AppColors.ThemeColor,
      navigate: 'TermsAndConditions',
    },
    {
      id: 7,
      icon: 'sign-out',
      label: 'Log Out',
      navigate: 'Auth',
      isLogOut: true,
      bgColor: AppColors.LIGHTGRAY,
    },
  ];

  const renderMenuItem = (item, showBorder = false) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        if (item.isLogOut) {
          Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Logout',
                onPress: async () => {
                  await logout();
                  navigation.navigate('Auth');
                },
              },
            ]
          );
        } else if (item.navigate) {
          navigation?.navigate(item.navigate);
        }
      }}
    >
      <View style={styles.menuItem}>
        <View
          style={[styles.menuIconContainer, { backgroundColor: item.bgColor }]}
        >
          <FontAwesome
            name={item.icon}
            size={responsiveFontSize(2.2)}
            color={item.isLogOut ? AppColors.GRAY : AppColors.WHITE}
          />
        </View>
        <AppText
          title={item.label}
          textSize={1.5}
          textColor={AppColors.BLACK}
        />
        {item.hasToggle && (
          <View style={styles.toggleContainer}>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
              trackColor={{ false: '#E0E0E0', true: AppColors.ThemeColor }}
              thumbColor={AppColors.WHITE}
            />
          </View>
        )}
      </View>
      {showBorder && <View style={styles.menuDivider} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Curved Background */}
      <HomeHeader homeHead={false} title={'Accounts'} />
      <View style={styles.curveShape} />

      {/* Profile Card Section */}
      <View style={styles.profileCardWrapper}>
        <View style={styles.profileCard}>
          <Image
            source={user?.profileImage ? { uri: user.profileImage } : AppImages.avatar}
            style={styles.profileImage}
          />
          <LineBreak space={5} />
          <View style={styles.profileTextContainer}>
            <AppText
              title={user?.fullName || 'Guest User'}
              textSize={2.2}
              textColor={AppColors.BLACK}
              textFontWeight
            />
            <LineBreak space={0.3} />
            <AppText
              title={user?.email || 'guest@example.com'}
              textSize={1.5}
              textColor={AppColors.GRAY}
            />
          </View>
        </View>
      </View>

      <LineBreak space={1.5} />

      {/* Menu Items - Group 1: Account, Payment, Notifications */}
      <View style={styles.menuContainer}>
        <View style={styles.menuCard}>
          {renderMenuItem(menuItems[0])}
          <View style={styles.menuDivider} />
          {renderMenuItem(menuItems[1])}
          <View style={styles.menuDivider} />
          {renderMenuItem(menuItems[2])}
        </View>
      </View>

      <LineBreak space={1.5} />

      {/* Menu Items - Group 2: Help, Privacy, Terms, Logout */}
      <View style={styles.menuContainer}>
        <View style={styles.menuCard}>
          {renderMenuItem(menuItems[3])}
          <View style={styles.menuDivider} />
          {renderMenuItem(menuItems[4])}
          <View style={styles.menuDivider} />
          {renderMenuItem(menuItems[5])}
          <View style={styles.menuDivider} />
          {renderMenuItem(menuItems[6])}
        </View>
      </View>

      <LineBreak space={10} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerWrapper: {
    backgroundColor: AppColors.ThemeColor,
    paddingTop: responsiveHeight(1),
    overflow: 'hidden',
  },
  headerBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: responsiveHeight(1.5),
    gap: responsiveWidth(3),
  },
  backButton: {
    padding: responsiveWidth(2),
  },
  curveShape: {
    height: responsiveHeight(15),
    backgroundColor: AppColors.ThemeColor,
  },
  profileCardWrapper: {
    paddingHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(-10),
    marginBottom: responsiveHeight(0.5),
  },
  profileCard: {
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(3),
    paddingTop: responsiveHeight(7),
    backgroundColor: AppColors.WHITE,
    borderRadius: 16,
    position: 'relative',
  },
  profileImage: {
    width: responsiveWidth(28),
    height: responsiveWidth(28),
    borderRadius: responsiveWidth(4),
    backgroundColor: AppColors.LIGHTGRAY,
    position: 'absolute',
    top: responsiveHeight(-4),
    borderWidth: 3,
    borderColor: AppColors.WHITE,
  },
  profileTextContainer: {
    alignItems: 'center',
  },
  menuContainer: {
    paddingHorizontal: responsiveWidth(4),
  },
  menuCard: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(1.5),
    gap: responsiveWidth(3.5),
  },
  menuDivider: {
    height: 1,
    backgroundColor: AppColors.LIGHTGRAY,
    marginHorizontal: responsiveWidth(3.5),
  },
  menuIconContainer: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    marginLeft: 'auto',
  },
});

export default Account;
