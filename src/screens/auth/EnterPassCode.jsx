/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import AuthHeader from '../../components/AuthHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppButton from '../../components/AppButton';
import FieldCode from '../../components/CodeField';

const EnterPassCode = () => {
  const nav = useNavigation();
  const route = useRoute();
  const email = route.params?.email || '';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyCode = () => {
    if (!code || code.length < 4) {
      Alert.alert('Error', 'Please enter the complete verification code');
      return;
    }

    // Navigate to NewPassword screen with the code
    nav.navigate('NewPassword', { 
      resetToken: code,
      email: email 
    });
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
          pageHead="Enter Pass Code"
          subTitle={`Please enter the passcode we sent to ${email || 'your email'}.`}
        />
        <LineBreak space={3} />
        <FieldCode onCodeChange={setCode} />
        <LineBreak space={3} />
        <AppButton
          title={loading ? 'Verifying...' : 'Verify Code'}
          bgColor={AppColors.BLACK}
          handlePress={handleVerifyCode}
          disabled={loading || !code || code.length < 4}
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

export default EnterPassCode;
