/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, KeyboardAvoidingView, FlatList } from 'react-native';
import HeaderWithBack from '../../../components/HeaderWithBack';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppText';
import AppColors from '../../../utils/AppColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import { AppIcons } from '../../../assets/icons';
import PayCard from '../../../components/PayCard';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from './../../../components/AppButton';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const addedCards = [
  { id: 1, icon: AppIcons.cart_two, title: '**** **** **** *368' },
  { id: 2, icon: AppIcons.blank_cart, title: '**** **** **** *368' },
];

const AddNewPaymentMethod = () => {
  const [selectedCard, setSelectedCard] = useState('');
  const [state, setState] = useState({
    cardNumber: '',
    validThru: '',
    cvvNumber: '',
  });
  const [showAddNewPayment, setShowAddNewPayment] = useState(false);
  const nav = useNavigation();

  const onChangeHandler = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <HeaderWithBack title="Payment Methods" />
        <LineBreak space={2} />

        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
          <AppText
            title={'Payment Methods'}
            textSize={2}
            textFontWeight
            textColor={AppColors.BLACK}
          />
          <LineBreak space={2} />
          <FlatList
            data={addedCards}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={({ item, index }) => (
              <PayCard
                item={item}
                index={index}
                selectedCard={selectedCard === index}
                onCardPress={() => setSelectedCard(index)}
              />
            )}
          />

          <LineBreak space={2} />
          <AppText
            title={'Add new Payment Method'}
            textSize={2}
            textFontWeight
            textColor={AppColors.BLACK}
          />
          <LineBreak space={2} />

          <PayCard
            item={{
              icon: AppIcons.blank_cart,
              title: 'Visa Card',
            }}
            rightIcon={
              showAddNewPayment ? (
                <Entypo
                  name="chevron-small-down"
                  size={responsiveFontSize(3)}
                  color={AppColors.GRAY}
                />
              ) : null
            }
            onCardPress={() => setShowAddNewPayment(!showAddNewPayment)}
            index={1}
          />

          <LineBreak space={2} />

          {showAddNewPayment && (
            <View>
              <AppTextInput
                inputPlaceHolder={'Card Number'}
                borderWidth={-1}
                containerBg={AppColors.WHITE}
                inputHeight={6}
                value={state.cardNumber}
                onChangeText={text => onChangeHandler('cardNumber', text)}
              />
              <LineBreak space={2} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <AppTextInput
                  inputPlaceHolder={'Valid thru'}
                  inputWidth={40}
                  borderWidth={-1}
                  containerBg={AppColors.WHITE}
                  inputHeight={6}
                  value={state.validThru}
                  onChangeText={text => onChangeHandler('validThru', text)}
                />
                <AppTextInput
                  inputPlaceHolder={'CVV'}
                  inputWidth={40}
                  borderWidth={-1}
                  containerBg={AppColors.WHITE}
                  inputHeight={6}
                  value={state.cvvNumber}
                  onChangeText={text => onChangeHandler('cvvNumber', text)}
                />
              </View>
              <LineBreak space={4} />

              <AppButton
                title={'Add new Method'}
                bgColor={AppColors.ThemeColor}
                padding={15}
              />
            </View>
          )}

          <LineBreak space={2} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddNewPaymentMethod;
