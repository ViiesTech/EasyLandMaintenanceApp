/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
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
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false,
  });
  const nav = useNavigation();
  const { login, signInWithGoogle, signInWithFacebook } = useAuth();

  const onChangeText = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
    if (!state.email || !state.password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const result = await login(state.email, state.password);
      if (result.success) {
        nav.navigate('Main');
      } else {
        Alert.alert('Login Failed', result.error || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSocialLoading({ ...socialLoading, google: true });
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        nav.navigate('Main');
      } else {
        Alert.alert('Google Sign-In Failed', result.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Google sign-in failed');
    } finally {
      setSocialLoading({ ...socialLoading, google: false });
    }
  };

  const handleFacebookSignIn = async () => {
    setSocialLoading({ ...socialLoading, facebook: true });
    try {
      const result = await signInWithFacebook();
      if (result.success) {
        nav.navigate('Main');
      } else {
        Alert.alert('Facebook Sign-In Failed', result.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Facebook sign-in failed');
    } finally {
      setSocialLoading({ ...socialLoading, facebook: false });
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
          title={loading ? 'Logging in...' : 'Login'}
          bgColor={AppColors.BLACK}
          handlePress={handleLogin}
          disabled={loading}
        />
        {loading && (
          <View style={{ position: 'absolute', top: '50%' }}>
            <ActivityIndicator size="large" color={AppColors.ThemeColor} />
          </View>
        )}
        <LineBreak space={2} />
        <AppText
          title={'Or Login With'}
          textSize={1.8}
          textColor={AppColors.GRAY}
          textFontWeight
        />
        <LineBreak space={2} />
        <AppButton
          title={socialLoading.facebook ? 'Signing in...' : 'Continue with Facebook'}
          bgColor={AppColors.ThemeColor}
          textColor={AppColors.WHITE}
          leftIcon={
            <SVGXml icon={AppIcons.facebook_white} width={15} height={15} />
          }
          handlePress={handleFacebookSignIn}
          disabled={socialLoading.facebook || socialLoading.google}
        />
        <LineBreak space={2} />
        <AppButton
          title={socialLoading.google ? 'Signing in...' : 'Continue with Google'}
          bgColor={AppColors.WHITE}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          textColor={AppColors.BLACK}
          leftIcon={
            <SVGXml icon={AppIcons.google_black} width={15} height={15} />
          }
          handlePress={handleGoogleSignIn}
          disabled={socialLoading.google || socialLoading.facebook}
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
