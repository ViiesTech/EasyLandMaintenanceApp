/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LineBreak from '../../../components/LineBreak';
import AppColors from '../../../utils/AppColors';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import {
  responsiveWidth,
  responsiveHeight,
} from '../../../utils/Responsive_Dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeHeader from '../../../components/HomeHeader';
import AppButton from '../../../components/AppButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAuth } from '../../../context/AuthContext';

const EditAccount = ({ navigation }) => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) : '');
    }
  }, [user]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    setDateOfBirth(formattedDate);
    hideDatePicker();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = {
        fullName: name,
        phone: phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : undefined,
      };

      // Only include password if it was changed
      if (password && password.trim()) {
        updateData.password = password;
      }

      const result = await updateUserProfile(updateData);
      
      if (result.success) {
        Alert.alert('Success', 'Profile updated successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Error', result.error || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <HomeHeader homeHead={false} title={'Accounts'} />

        <LineBreak space={2} />

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Full Name Input */}
          <View style={styles.inputGroup}>
            <View style={styles.label}>
              <AppText
                title={'Full Name'}
                textSize={1.2}
                textColor={AppColors.GRAY}
              />
            </View>
            <AppTextInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={AppColors.GRAY}
              borderWidth={-1}
              paddingVertical={-1}
            />
          </View>

          <LineBreak space={1} />

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <View style={styles.label}>
              <AppText
                title={'Email'}
                textSize={1.2}
                textColor={AppColors.GRAY}
              />
            </View>
            <AppTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor={AppColors.GRAY}
              borderWidth={-1}
              paddingVertical={-1}
            />
          </View>

          <LineBreak space={1} />

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.label}>
              <AppText
                title={'Password'}
                textSize={1.2}
                textColor={AppColors.GRAY}
              />
            </View>
            <AppTextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor={AppColors.GRAY}
              borderWidth={-1}
              paddingVertical={-1}
              rightIcon={
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <FontAwesome
                    name={showPassword ? 'eye' : 'eye-slash'}
                    size={20}
                    color={AppColors.GRAY}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <LineBreak space={1} />

          {/* Phone Input */}
          <View style={styles.inputGroup}>
            <View style={styles.label}>
              <AppText
                title={'Phone Number'}
                textSize={1.2}
                textColor={AppColors.GRAY}
              />
            </View>
            <AppTextInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor={AppColors.GRAY}
              borderWidth={-1}
              paddingVertical={-1}
            />
          </View>

          <LineBreak space={1} />

          {/* Date of Birth Input */}
          <TouchableOpacity style={styles.inputGroup} onPress={showDatePicker}>
            <View style={styles.label}>
              <AppText
                title={'Date of Birth'}
                textSize={1.2}
                textColor={AppColors.GRAY}
              />
            </View>
            <AppTextInput
              placeholder="Date of Birth"
              value={dateOfBirth}
              placeholderTextColor={AppColors.GRAY}
              borderWidth={-1}
              editable={false}
              paddingVertical={-1}
            />
          </TouchableOpacity>

          {/* Date Picker Modal */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            display="spinner"
          />

          <LineBreak space={1} />

          <AppButton
            title={loading ? 'Saving...' : 'Save'}
            buttoWidth={92}
            bgColor={AppColors.ThemeColor}
            handlePress={handleSave}
            disabled={loading}
          />

          {loading && (
            <View style={{ alignItems: 'center', marginTop: responsiveHeight(2) }}>
              <ActivityIndicator size="large" color={AppColors.ThemeColor} />
            </View>
          )}
        </View>

        <LineBreak space={3} />
      </ScrollView>
    </KeyboardAvoidingView>
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
  curveShape: {
    height: responsiveHeight(8),
    backgroundColor: AppColors.ThemeColor,
    borderBottomLeftRadius: responsiveWidth(15),
    borderBottomRightRadius: responsiveWidth(15),
  },
  formContainer: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    borderRadius: 0,
    marginHorizontal: 0,
  },
  inputGroup: {
    marginBottom: responsiveHeight(0.5),
    backgroundColor: AppColors.WHITE,
    borderRadius: 15,
  },
  passwordInputContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: responsiveWidth(3),
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  label: {
    paddingHorizontal: responsiveWidth(3),
    paddingTop: responsiveHeight(1),
  },
});

export default EditAccount;
