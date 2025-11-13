/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServiceStatus from '../../../components/ServiceStatus';
import AppColors from '../../../utils/AppColors';
import AppText from '../../../components/AppText';
import Icon from 'react-native-vector-icons/Octicons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import LineBreak from '../../../components/LineBreak';
import { AppImages } from '../../../assets/images';
import AppTextInput from '../../../components/AppTextInput';
import StarRating from 'react-native-star-rating-widget';
import SVGXml from '../../../components/SVGXML';
import { AppIcons } from '../../../assets/icons';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, title: '$5' },
  { id: 2, title: '$10' },
  { id: 3, title: '$15' },
  { id: 4, title: 'No Tip' },
];

const ServiceComplete = () => {
  const [rating, setRating] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const nav = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ServiceStatus
          middleTitle={'Service Complete !'}
          topContent={
            <Icon
              name={'check-circle'}
              size={responsiveFontSize(5)}
              color={AppColors.WHITE}
            />
          }
          bottomContent={
            <AppText
              title={'How was your experience?'}
              textSize={1.6}
              textColor={AppColors.BLACK}
            />
          }
        />
        <LineBreak space={2} />
        <View
          style={{
            borderWidth: 1,
            borderColor: AppColors.LIGHTGRAY,
            marginHorizontal: responsiveWidth(4),
            paddingHorizontal: responsiveWidth(4),
            borderRadius: 20,
            paddingVertical: responsiveHeight(2),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image
              source={AppImages.user}
              style={{ width: 60, height: 60, borderRadius: 100 }}
            />
            <View>
              <AppText
                title={'Gregory Smith'}
                textSize={2}
                textFontWeight
                textColor={AppColors.BLACK}
              />
              <AppText
                title={'Hedge Trimming'}
                textSize={2}
                textColor={AppColors.GRAY}
              />
            </View>
          </View>
          <LineBreak space={2} />
          <AppText
            title={'Rate your experience'}
            textSize={2}
            textAlignment={'center'}
            textColor={AppColors.BLACK}
          />

          <LineBreak space={1} />

          <View style={{ alignItems: 'center' }}>
            <StarRating rating={rating} onChange={setRating} />
          </View>

          <LineBreak space={2} />

          <View>
            <AppText
              title={'Add a comment (optional)'}
              textSize={2}
              textColor={AppColors.BLACK}
            />
            <LineBreak space={0.5} />
            <AppTextInput
              inputPlaceHolder={'Share details of your experience...'}
              borderWidth={-1}
              containerBg={AppColors.LIGHTGRAY}
              borderRadius={6}
              inputHeight={10}
              inputWidth={80}
              textAlignVertical={'top'}
              multiline={true}
            />
          </View>
        </View>
        <LineBreak space={2} />
        <View
          style={{
            borderWidth: 1,
            borderColor: AppColors.LIGHTGRAY,
            marginHorizontal: responsiveWidth(4),
            paddingHorizontal: responsiveWidth(4),
            borderRadius: 20,
            paddingVertical: responsiveHeight(2),
          }}
        >
          <AppText
            title={'Payment Summary'}
            textSize={2}
            textColor={AppColors.BLACK}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Service (1-2 hours)'}
            borderWidth={-1}
            borderBottomWidth={1}
            placeholderTextColor={AppColors.BLACK}
            inputWidth={70}
            rightIcon={
              <AppText title={'$49'} textSize={2} textColor={AppColors.BLACK} />
            }
          />
          <LineBreak space={1} />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: responsiveWidth(3),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <AppText
              title={'Total'}
              textSize={2.3}
              textColor={AppColors.BLACK}
            />
            <AppText
              title={'$49'}
              textSize={2.3}
              textColor={AppColors.ThemeColor}
            />
          </View>
          <LineBreak space={2} />
          <AppText
            title={'Add a tip for Maria Santos'}
            textSize={2}
            textColor={AppColors.BLACK}
          />
          <LineBreak space={2} />
          <FlatList
            data={data}
            horizontal
            contentContainerStyle={{
              width: responsiveWidth(80),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderColor:
                    selectedCard == index
                      ? AppColors.ThemeColor
                      : AppColors.LIGHTGRAY,
                  width: responsiveWidth(18),
                  height: responsiveHeight(8),
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setSelectedCard(index)}
              >
                <AppText
                  title={item.title}
                  textSize={2}
                  textColor={
                    selectedCard == index
                      ? AppColors.ThemeColor
                      : AppColors.BLACK
                  }
                />
              </TouchableOpacity>
            )}
          />
          <LineBreak space={2} />
          <View
            style={{
              backgroundColor: '#F9FAFB',
              flexDirection: 'row',
              gap: 20,
              paddingHorizontal: responsiveWidth(4),
              paddingVertical: responsiveHeight(2),
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <SVGXml icon={AppIcons.cart} width={22} height={22} />
            <View>
              <AppText
                title={'Visa •••• 4242'}
                textSize={2}
                textColor={AppColors.BLACK}
              />
              <AppText
                title={'Default payment method'}
                textSize={2}
                textColor={AppColors.GRAY}
              />
            </View>
            <TouchableOpacity
              onPress={() => nav.navigate('AddNewPaymentMethod')}
            >
              <AppText
                title={'Change'}
                textSize={2}
                textColor={AppColors.BLACK}
              />
            </TouchableOpacity>
          </View>
        </View>

        <LineBreak space={4} />

        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: AppColors.LIGHTGRAY,
            paddingVertical: responsiveHeight(4),
            alignItems: 'center',
          }}
        >
          <AppButton title={'Pay Now'} bgColor={AppColors.ThemeColor} />
        </View>

        <LineBreak space={2} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceComplete;
