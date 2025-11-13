/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/main/Home/Home';
import SVGXml from './../components/SVGXML';
import { AppIcons } from './../assets/icons/index';
import Services from '../screens/main/Services/Services';
import Tasks from '../screens/main/Tasks/Tasks';
import Account from './../screens/main/Account/Account';
import AppColors from '../utils/AppColors';
import { responsiveFontSize, responsiveHeight } from '../utils/Responsive_Dimensions';
import ServicesProfile from './../screens/main/Home/ServicesProfile';
import Messages from './../screens/main/Home/Messages';
import IncomingCall from './../screens/main/Home/IncomingCall';
import ServiceProgress from './../screens/main/Home/ServiceProgress';
import ServiceComplete from './../screens/main/Home/ServiceComplete';
import AddNewPaymentMethod from './../screens/main/Home/AddNewPaymentMethod';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={MyTabs} />
      <Stack.Screen name="ServicesProfile" component={ServicesProfile} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="IncomingCall" component={IncomingCall} />
      <Stack.Screen name="ServiceProgress" component={ServiceProgress} />
      <Stack.Screen name="ServiceComplete" component={ServiceComplete} />
      <Stack.Screen name="AddNewPaymentMethod" component={AddNewPaymentMethod} />
    </Stack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#424758',
        tabBarInactiveTintColor: AppColors.GRAY,
        tabBarStyle: {
          height: responsiveHeight(12),
          paddingTop: responsiveHeight(1.2),
        position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -3},
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        tabBarLabelStyle: {
          paddingTop: responsiveHeight(0.5),
          fontSize: responsiveFontSize(1.6),
        }
      }}
    >
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SVGXml icon={AppIcons.home_dark} width={30} height={30} />
            ) : (
              <SVGXml icon={AppIcons.home_light} width={30} height={30} />
            ),
        }}
      />
      <Tab.Screen
        name={'Services'}
        component={Services}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SVGXml icon={AppIcons.landscape_dark} width={30} height={30} />
            ) : (
              <SVGXml icon={AppIcons.landscape_light} width={30} height={30} />
            ),
        }}
      />
      <Tab.Screen
        name={'Tasks'}
        component={Tasks}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SVGXml icon={AppIcons.receipt_dark} width={30} height={30} />
            ) : (
              <SVGXml icon={AppIcons.receipt_light} width={30} height={30} />
            ),
        }}
      />
      <Tab.Screen
        name={'Account'}
        component={Account}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SVGXml icon={AppIcons.account_dark} width={30} height={30} />
            ) : (
              <SVGXml icon={AppIcons.account_light} width={30} height={30} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
export default Main;
