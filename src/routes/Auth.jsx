/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from '../screens/auth/OnBoarding';
import Splash from '../screens/auth/Splash';
import SplashFullScreen from './../screens/auth/SplashFullScreen';
import Login from './../screens/auth/Login';
import SignUp from './../screens/auth/SignUp';
import ForgetPassword from './../screens/auth/ForgetPassword';
import EnterPassCode from './../screens/auth/EnterPassCode';
import NewPassword from './../screens/auth/NewPassword';
import SelectType from './../screens/auth/SelectType';
import EnableLocation from './../screens/auth/EnableLocation';
import CompleteYourProfile from './../screens/auth/CompleteYourProfile';

const Stack = createStackNavigator();
const Auth = () => {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SplashFullScreen" component={SplashFullScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="EnterPassCode" component={EnterPassCode} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="SelectType" component={SelectType} />
        <Stack.Screen name="EnableLocation" component={EnableLocation} />
        <Stack.Screen
          name="CompleteYourProfile"
          component={CompleteYourProfile}
        />
      </Stack.Navigator>
  );
};

export default Auth;
