/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import AppColors from '../../utils/AppColors';
import AuthHeader from '../../components/AuthHeader';
import { AppIcons } from '../../assets/icons';
import LineBreak from '../../components/LineBreak';
import SVGXml from '../../components/SVGXML';
import AppText from '../../components/AppText';
import { responsiveWidth } from '../../utils/Responsive_Dimensions';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/AppButton';

const data = [
  { id: 1, icon: AppIcons.user, title: 'User' },
  { id: 2, icon: AppIcons.landscaper, title: 'Landscraper' },
];

const SelectType = () => {
  const nav = useNavigation();
  const [type, setType] = useState('User');

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <LineBreak space={4} />
      <AuthHeader pageHead="Sign up As" />
      <LineBreak space={4} />

      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={data}
          ItemSeparatorComponent={<LineBreak space={1} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setType(item.title)}>
              <SVGXml
                icon={item.icon}
                width={responsiveWidth(32)}
                height={responsiveWidth(32)}
              />
              <LineBreak space={2} />
              <AppText
                title={item.title}
                textSize={2}
                textColor={
                  type === item.title ? AppColors.ThemeColor : AppColors.GRAY
                }
                textFontWeight
                textAlignment={'center'}
              />
            </TouchableOpacity>
          )}
        />

        <LineBreak space={2} />

        <AppButton
          title={'Continue'}
          bgColor={AppColors.BLACK}
          handlePress={() => nav.navigate('EnableLocation')}
        />
      </View>
    </View>
  );
};

export default SelectType;
