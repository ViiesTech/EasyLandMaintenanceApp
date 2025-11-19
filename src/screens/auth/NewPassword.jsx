/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import AppColors from '../../utils/AppColors';
import AuthHeader from '../../components/AuthHeader';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppButton from '../../components/AppButton';
import ApiService from '../../services/api';

const NewPassword = () => {
  const [state, setState] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  const route = useRoute();
  const resetToken = route.params?.resetToken || '';

  const onChangeText = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const handleResetPassword = async () => {
    // Validate password
    if (!state.password.trim()) {
      Alert.alert('Error', 'Please enter a new password');
      return;
    }

    if (state.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (state.password !== state.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!resetToken) {
      Alert.alert('Error', 'Invalid reset token. Please try again.');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.resetPassword(resetToken, state.password);
      
      if (response.success) {
        Alert.alert(
          'Success',
          'Your password has been reset successfully',
          [
            {
              text: 'OK',
              onPress: () => nav.navigate('Login'),
            },
          ]
        );
      } else {
        Alert.alert('Error', response.message || 'Failed to reset password');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Unable to reset password. Please try again.'
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
          pageHead="New Password"
          subTitle="Create and confirm your new secure password."
        />
        <LineBreak space={3} />
        <AppTextInput
          inputPlaceHolder={'Password'}
          inputWidth={85}
          secureTextEntry={true}
          value={state.password}
          onChangeText={text => onChangeText('password', text)}
          containerBg={AppColors.inputBgColor}
          editable={!loading}
        />
        <LineBreak space={2} />
        <AppTextInput
          inputPlaceHolder={'Confirm new Password'}
          inputWidth={85}
          secureTextEntry={true}
          value={state.confirmPassword}
          onChangeText={text => onChangeText('confirmPassword', text)}
          containerBg={AppColors.inputBgColor}
          editable={!loading}
        />
        <LineBreak space={2} />
        <AppButton
          title={loading ? 'Resetting...' : 'Confirm New Password'}
          bgColor={AppColors.BLACK}
          handlePress={handleResetPassword}
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

export default NewPassword;
