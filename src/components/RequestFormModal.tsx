/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image, ImageBackground } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import AppText from './AppText';
import LineBreak from './LineBreak';
import LabelContainer from './LabelContainer';
import AppTextInput from './AppTextInput';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppButton from './AppButton';
import SVGXml from './SVGXML';
import { AppIcons } from '../assets/icons';
import AppDropDown from './AppDropDown';
import ImagePicker from "react-native-image-crop-picker";

type Prop = {
  visible?: boolean,
  setVisible?: any,
}

const yardSize = [
  { id: 1, title: 'Small', subTitle: '< 1000 sq ft' },
  { id: 2, title: 'Medium', subTitle: '< 1000 sq ft' },
  { id: 3, title: 'Large', subTitle: '< 1000 sq ft' },
]

const RequestFormModal = ({ visible, setVisible }: Prop) => {
  const [selectedSize, setSelectedSize] = useState(yardSize[0]?.title)
  const [state, setState] = useState({
    serviceType: '',
    desc: '',
  });
  const [images, setImages] = useState([]);

  const onChangeText = (key, value) => (
    setState(prev => ({ ...prev, [key]: value }))
  )

  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        multiple: true,
        mediaType: 'photo',
      });

      // Normalize to always be an array
      // const selectedImages = Array.isArray(result) ? result : [result];

      // // Map to your desired format
      // const formattedImages = selectedImages.map((item) => ({
      //   image: item.path,
      // }));

      setImages(result);
      console.log('✅ Selected Images:', result);
    } catch (error) {
      if (error.message?.includes('cancelled')) {
        console.log('⚠️ User cancelled image selection');
      } else {
        console.error('❌ Image Picker Error:', error);
      }
    }
  }

  const removeImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)}>

        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={{
              flex: 1,
              paddingHorizontal: responsiveWidth(4),
            }}>
              <LineBreak space={1} />
              <AppText
                title={'Request Form'}
                textSize={2}
                textColor={AppColors.BLACK}
                textFontWeight
              />

              <LineBreak space={1} />

              <LabelContainer label='Select Type *'>
                <AppDropDown value={state.serviceType} setValue={(text) => onChangeText('serviceType', text)} />
              </LabelContainer>

              <LineBreak space={1} />
              <AppText
                title={'Photos (Optional)'}
                textSize={2}
                textColor={AppColors.BLACK}
              />
              <AppText
                title={'Helps landscapers provide accurate quotes'}
                textSize={1.6}
                textColor={AppColors.GRAY}
              />
              <LineBreak space={1} />

              <TouchableOpacity onPress={() => {
                if (images.length >= 5 || images.length !== 0) {
                  return null
                } else {
                  handleSelectImage()
                }
              }} activeOpacity={!!images.length ? 1 : 0} style={{ borderWidth: 1, borderColor: AppColors.GRAY, borderRadius: 10, justifyContent: !!images.length ? 'flex-start' : 'center', alignItems: !!images.length ? 'flex-start' : 'center', height: responsiveHeight(10) }}>
                {images.length === 0 && <Feather name="camera" size={responsiveFontSize(4)} color={AppColors.GRAY} />}
                {images.length !== 0 && <FlatList
                  data={images}
                  horizontal
                  contentContainerStyle={{ gap: 5, alignItems: 'center', paddingHorizontal: responsiveWidth(2) }}
                  renderItem={({ item, index }) => (
                    <View>
                      <ImageBackground source={{ uri: item?.path }} imageStyle={{ borderRadius: 10 }} style={{ alignItems: 'flex-end', paddingHorizontal: responsiveWidth(1), paddingVertical: responsiveHeight(0.5), width: responsiveWidth(15.5), height: responsiveHeight(9) }}>
                        <TouchableOpacity onPress={() => removeImage(index)} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: AppColors.ThemeColor, width: 20, height: 20, borderRadius: 100 }}>
                          <MaterialIcons name="close" size={responsiveFontSize(1.8)} color={AppColors.WHITE} />
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  )}
                />}
              </TouchableOpacity>

              <LineBreak space={1} />

              <LabelContainer label='Description'>
                <AppTextInput
                  inputPlaceHolder={'Enter your details'}
                  borderWidth={-1}
                  containerBg={AppColors.LightestGray}
                  inputWidth={65}
                  inputHeight={15}
                  textAlignVertical={'top'}
                  value={state.desc}
                  onChangeText={(text) => onChangeText('desc', text)}
                  multiline={true}
                  rightIcon={
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 4, paddingTop: responsiveHeight(1) }}>
                      <Ionicons name="language" size={responsiveFontSize(2)} color={AppColors.GRAY} />
                      <Feather name="chevron-down" size={responsiveFontSize(2)} color={AppColors.GRAY} />
                    </View>
                  }
                />
              </LabelContainer>

              <LineBreak space={1} />

              <LabelContainer label='Location'>
                <View style={{ borderRadius: 10, paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1), backgroundColor: AppColors.LightestGray }}>
                  <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                    <SVGXml icon={AppIcons.location_green} width={22} height={22} />
                    <View>
                      <AppText
                        title={'Current Location'}
                        textSize={1.7}
                        textColor={AppColors.BLACK}
                      />
                      <AppText
                        title={'Lat: 28.6139, Lng: 77.2090'}
                        textSize={1.6}
                        textColor={AppColors.GRAY}
                      />
                      <TouchableOpacity>
                        <AppText
                          title={'Change Location'}
                          textSize={1.6}
                          textColor={'#00A63E'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>
              </LabelContainer>
              <LineBreak space={1} />

              <LabelContainer label='Yard Size *'>
                <FlatList
                  data={yardSize}
                  horizontal
                  contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderColor: selectedSize === item.title ? AppColors.ThemeColor : AppColors.LIGHTGRAY,
                        width: responsiveWidth(24),
                        height: responsiveHeight(9),
                        backgroundColor: selectedSize === item.title ? '#D9FAEF' : AppColors.WHITE,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => setSelectedSize(item.title)}
                    >
                      <AppText
                        title={item.title}
                        textSize={2}
                        textColor={AppColors.BLACK}
                      />
                      <AppText
                        title={item.subTitle}
                        textSize={1.6}
                        textColor={AppColors.GRAY}
                      />
                    </TouchableOpacity>
                  )}
                />
              </LabelContainer>

              <LineBreak space={1} />

              <AppButton title={'Submit'} buttoWidth={88} bgColor={AppColors.BLACK} handlePress={() => setVisible(false)} />

              <LineBreak space={2} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: responsiveWidth(95),
    height: responsiveHeight(85),
    backgroundColor: AppColors.WHITE,
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
});

export default RequestFormModal;
