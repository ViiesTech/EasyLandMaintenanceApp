/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import AuthHeader from '../../components/AuthHeader';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/AppButton';
import FieldCode from '../../components/CodeField';

const EnterPassCode = () => {
  const nav = useNavigation();

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
          subTitle="Please enter the passcode we sent you."
        />
        <LineBreak space={3} />
        <FieldCode />
        <LineBreak space={3} />
        <AppButton
          title={'Verify Email'}
          bgColor={AppColors.BLACK}
          handlePress={() => nav.navigate('NewPassword')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EnterPassCode;
