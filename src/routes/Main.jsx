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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={MyTabs} />
      {/* <Stack.Screen name="SpecialistProfile" component={SpecialistProfile} /> */}
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
          height: 80,
          paddingTop: responsiveHeight(1.2),
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
