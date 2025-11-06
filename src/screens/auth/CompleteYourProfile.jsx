/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AuthHeader from '../../components/AuthHeader';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import { responsiveWidth } from '../../utils/Responsive_Dimensions';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/icons';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, title: 'Residential (House/Apartment)' },
  { id: 2, title: 'Commercial' },
  { id: 3, title: 'Farmland' },
  { id: 4, title: 'Garden/Park' },
];

const CompleteYourProfile = () => {
  const [selectedProperty, setSelectedProperty] = useState('');
  const nav = useNavigation();
  const [state, setState] = useState({
    name: '',
    address: '',
  });

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
          pageHead="Complete Your Profile"
          subTitle="Tell us a bit about your property"
          subTitleSpace={1}
        />

        <LineBreak space={2} />

        <View style={{ width: responsiveWidth(85) }}>
          <View>
            <AppText
              title={'Your Name'}
              textSize={1.8}
              textFontWeight
              textColor={AppColors.GRAY}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Alex Smith'}
              borderWidth={-1}
              containerBg={`#F3F3F5`}
              value={state.name}
              onChangeText={text => onChangeText('name', text)}
              logo={<SVGXml icon={AppIcons.profile} width={20} height={20} />}
            />
          </View>
          <LineBreak space={2} />
          <View>
            <AppText
              title={'Address'}
              textSize={1.8}
              textFontWeight
              textColor={AppColors.GRAY}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'House no, Street, Area'}
              borderWidth={-1}
              containerBg={`#F3F3F5`}
              value={state.address}
              onChangeText={text => onChangeText('address', text)}
              logo={<SVGXml icon={AppIcons.home} width={20} height={20} />}
            />
          </View>
          <LineBreak space={2} />
          <AppText
            title={'Property Type'}
            textSize={1.8}
            textFontWeight
            textColor={AppColors.GRAY}
          />
          <LineBreak space={1} />
          <View>
            <FlatList
              data={data}
              ItemSeparatorComponent={<LineBreak space={1} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
                  onPress={() => setSelectedProperty(item.title)}
                >
                  <SVGXml
                    icon={
                      selectedProperty === item.title
                        ? AppIcons.primitive_dot
                        : AppIcons.primitive_empty
                    }
                    width={20}
                    height={20}
                  />
                  <AppText
                    title={item.title}
                    textSize={1.8}
                    textColor={AppColors.GRAY}
                    textFontWeight
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <LineBreak space={2} />
        <AppButton
          title={'Get Started'}
          bgColor={AppColors.BLACK}
          handlePress={() => nav.navigate('Main')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CompleteYourProfile;
