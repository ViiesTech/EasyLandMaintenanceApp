/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import AppColors from '../../utils/AppColors';
import AuthHeader from '../../components/AuthHeader';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/AppButton';

const NewPassword = () => {
  const [state, setState] = useState({
    password: '',
    confirmPassword: '',
  });
  const nav = useNavigation();

  const onChangeText = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
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
        />
        <LineBreak space={2} />
        <AppTextInput
          inputPlaceHolder={'Confirm new Password'}
          inputWidth={85}
          secureTextEntry={true}
          value={state.confirmPassword}
          onChangeText={text => onChangeText('confirmPassword', text)}
          containerBg={AppColors.inputBgColor}
        />
        <LineBreak space={2} />
        <AppButton
          title={'Confirm New Password'}
          bgColor={AppColors.BLACK}
          handlePress={() => nav.navigate('Login')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewPassword;
