/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AppColors from '../../utils/AppColors';
import AuthHeader from '../../components/AuthHeader';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { responsiveWidth } from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppText';
import { useNavigation } from '@react-navigation/native';
import ApiService from '../../services/api';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const handleSendCode = async () => {
    // Validate email
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.forgotPassword(email);
      
      if (response.success) {
        Alert.alert(
          'Success',
          'Password reset code has been sent to your email',
          [
            {
              text: 'OK',
              onPress: () => nav.navigate('EnterPassCode', { email }),
            },
          ]
        );
      } else {
        Alert.alert('Error', response.message || 'Failed to send reset code');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Unable to send reset code. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, backgroundColor: AppColors.WHITE }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: AppColors.WHITE,
        }}
      >
        <AuthHeader
          pageHead="Forget Password"
          subTitle="Please enter your email below. We will send you a passcode."
        />
        <LineBreak space={3} />
        <AppTextInput
          inputPlaceHolder={'Email Address'}
          inputWidth={85}
          value={email}
          onChangeText={text => setEmail(text)}
          containerBg={AppColors.inputBgColor}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
        <LineBreak space={1.5} />
        <View style={{ width: responsiveWidth(85), alignItems: 'flex-end' }}>
          <TouchableOpacity disabled={loading}>
            <AppText
              title={'Use Phone number?'}
              textSize={1.8}
              textColor={loading ? AppColors.LIGHTGRAY : AppColors.GRAY}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={1.5} />
        <AppButton
          title={loading ? 'Sending...' : 'Send Code'}
          bgColor={AppColors.BLACK}
          handlePress={handleSendCode}
          disabled={loading}
        />
        {loading && (
          <View style={{ position: 'absolute', top: '50%' }}>
            <ActivityIndicator size="large" color={AppColors.ThemeColor} />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassword;
