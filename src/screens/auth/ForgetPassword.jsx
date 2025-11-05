/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import AppColors from '../../utils/AppColors';
import AuthHeader from '../../components/AuthHeader';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { responsiveWidth } from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppText';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
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
        />
        <LineBreak space={1.5} />
        <View style={{ width: responsiveWidth(85), alignItems: 'flex-end' }}>
          <TouchableOpacity>
            <AppText
              title={'Use Phone number?'}
              textSize={1.8}
              textColor={AppColors.GRAY}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={1.5} />
        <AppButton
          title={'Send Code'}
          bgColor={AppColors.BLACK}
          handlePress={() => nav.navigate('EnterPassCode')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassword;
