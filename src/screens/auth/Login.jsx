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
import { responsiveWidth } from '../../utils/Responsive_Dimensions';

const Login = () => {
  const [state, setState] = useState({
    email: '',
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
        <AuthHeader pageHead="Login To Continue" />
        <LineBreak space={3} />
        <AppTextInput
          inputPlaceHolder={'Email Address'}
          inputWidth={85}
          value={state.email}
          onChangeText={text => onChangeText('email', text)}
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
        <View style={{ width: responsiveWidth(85), alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => nav.navigate('ForgetPassword')}>
            <AppText
              title={'Forget Password?'}
              textSize={1.8}
              textColor={AppColors.GRAY}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={2} />
        <AppButton
          title={'Login'}
          bgColor={AppColors.BLACK}
          handlePress={() => nav.navigate('Main')}
        />
        <LineBreak space={2} />
        <AppText
          title={'Or Login With'}
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
            title={`Don't have an account?`}
            textSize={1.8}
            textColor={AppColors.GRAY}
          />
          <TouchableOpacity onPress={() => nav.navigate('SignUp')}>
            <AppText
              title={'SignUp'}
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

export default Login;
