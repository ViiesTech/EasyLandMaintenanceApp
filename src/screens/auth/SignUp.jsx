/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import AppColors from '../../utils/AppColors';
import AppTextInput from '../../components/AppTextInput';
import LineBreak from '../../components/LineBreak';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
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
        <AuthHeader pageHead="Create an account" />
        <LineBreak space={3} />
        <AppTextInput
          inputPlaceHolder={'Name'}
          inputWidth={85}
          value={state.name}
          onChangeText={text => onChangeText('name', text)}
          containerBg={AppColors.inputBgColor}
        />
        <LineBreak space={2} />
        <AppTextInput
          inputPlaceHolder={'Email Address'}
          inputWidth={85}
          value={state.email}
          onChangeText={text => onChangeText('email', text)}
          containerBg={AppColors.inputBgColor}
        />
        <LineBreak space={2} />
        <AppTextInput
          inputPlaceHolder={'Phone Number'}
          inputWidth={85}
          value={state.number}
          onChangeText={text => onChangeText('number', text)}
          containerBg={AppColors.inputBgColor}
        />
        <LineBreak space={2} />
        <AppTextInput
          inputPlaceHolder={'Password'}
          inputWidth={85}
          secureTextEntry={true}
          value={state.password}
          onChangeText={text => onChangeText('password', text)}
          containerBg={AppColors.inputBgColor}
        />
        <LineBreak space={2} />
        <AppButton title={'Sign up'} bgColor={AppColors.BLACK} />
        <LineBreak space={2} />
        <AppText
          title={'Or Sign up With'}
          textSize={1.8}
          textColor={AppColors.GRAY}
          textFontWeight
        />
        <LineBreak space={2} />
        <AppButton
          title={'Continue with Facebook'}
          bgColor={AppColors.ThemeColor}
          textColor={AppColors.WHITE}
          leftIcon={
            <SVGXml icon={AppIcons.facebook_white} width={15} height={15} />
          }
        />
        <LineBreak space={2} />
        <AppButton
          title={'Continue with Google'}
          bgColor={AppColors.WHITE}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          textColor={AppColors.BLACK}
          leftIcon={
            <SVGXml icon={AppIcons.google_black} width={15} height={15} />
          }
        />
        <LineBreak space={2} />
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <AppText
            title={`Already have an account?`}
            textSize={1.8}
            textColor={AppColors.GRAY}
          />
          <TouchableOpacity onPress={() => nav.navigate('Login')}>
            <AppText
              title={'Login'}
              textSize={1.8}
              textColor={AppColors.BLACK}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
