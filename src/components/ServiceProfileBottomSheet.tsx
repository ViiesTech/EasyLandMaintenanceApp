/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image, ScrollView } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { AppImages } from '../assets/images';
import AppColors from '../utils/AppColors';
import AppText from './AppText';
import LineBreak from './LineBreak';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppButton from './AppButton';
import StarRating from './StarRating';

const { height } = Dimensions.get('window');

const data = [
    { id: 1, image: AppImages.user, name: 'Leon Carroll', designation: 'Pest Technician', rating: 2.8, ml: '0.9', time: '9 mint', price: '$49.00' },
    { id: 2, image: AppImages.user, name: 'Leon Carroll', designation: 'Pest Technician', rating: 2.8, ml: '0.9', time: '9 mint', price: '$49.00' },
    { id: 3, image: AppImages.user, name: 'Leon Carroll', designation: 'Pest Technician', rating: 2.8, ml: '0.9', time: '9 mint', price: '$49.00' },
    { id: 4, image: AppImages.user, name: 'Leon Carroll', designation: 'Pest Technician', rating: 2.8, ml: '0.9', time: '9 mint', price: '$49.00' },
    { id: 5, image: AppImages.user, name: 'Leon Carroll', designation: 'Pest Technician', rating: 2.8, ml: '0.9', time: '9 mint', price: '$49.00' },
]

type Prop = {
    refRBSheet?: any;
    setIsOpenServicesProfiles?: any;
    viewDetailsHandlePress?: any;
}

const ServiceProfileBottomSheet = ({ refRBSheet, setIsOpenServicesProfiles, viewDetailsHandlePress }: Prop) => {
    const [selectedServiceProfile, setSelectedServiceProfile] = useState({ index: null });

    return (
        <RBSheet
            ref={refRBSheet}
            height={height * 0.55}
            openDuration={250}
            onOpen={() => setIsOpenServicesProfiles(true)}
            onClose={() => setIsOpenServicesProfiles(false)}
            closeOnDragDown={true}
            customStyles={{
                container: styles.sheetContainer,
                draggableIcon: styles.dragIcon,
            }}
        >
            <View style={styles.content}>
                <ScrollView style={{ flex: 1 }}>
                    <FlatList
                        data={data}
                        ListFooterComponent={<LineBreak space={2} />}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={{ paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(1), backgroundColor: selectedServiceProfile?.index == index ? AppColors.ThemeColor : AppColors.WHITE }} onPress={() => setSelectedServiceProfile({ index: index })}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    <Image source={item.image} style={{ width: 70, height: 70, borderRadius: 100 }} />
                                    <View>
                                        <AppText
                                            title={item.name}
                                            textSize={2.5}
                                            textColor={AppColors.BLACK}
                                            textFontWeight
                                        />
                                        <LineBreak space={0.5} />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                            <AppText
                                                title={item.designation}
                                                textSize={1.5}
                                                textColor={selectedServiceProfile?.index == index ? AppColors.WHITE : AppColors.GRAY}
                                                textFontWeight
                                            />
                                            <AppText
                                                title={item.rating}
                                                textSize={1.5}
                                                textColor={selectedServiceProfile?.index == index ? AppColors.WHITE : AppColors.GRAY}
                                            />
                                            <StarRating rating={item.rating} size={responsiveFontSize(1.5)} color="orange" />
                                        </View>
                                        <LineBreak space={0.5} />
                                        <View style={{ flexDirection: 'row', width: responsiveWidth(70), justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                <AppButton title={'View Details'} handlePress={viewDetailsHandlePress} bgColor={selectedServiceProfile?.index == index ? AppColors.WHITE : AppColors.ThemeColor} textColor={AppColors.BLACK} textSize={1.1} borderRadius={4} buttoWidth={20} padding={5} />
                                                <AppText
                                                    title={item.ml}
                                                    textSize={1.5}
                                                    textColor={AppColors.GRAY}
                                                />
                                                <AppText
                                                    title={item.time}
                                                    textSize={1.5}
                                                    textColor={AppColors.GRAY}
                                                />
                                            </View>
                                            <AppText
                                                title={item.price}
                                                textSize={2.1}
                                                textColor={AppColors.GRAY}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </View>
        </RBSheet>
    );
};

export default ServiceProfileBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openButton: {
        backgroundColor: '#1e90ff',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    sheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
    },
    dragIcon: {
        backgroundColor: '#ccc',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 10,
    },
    desc: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
    },
    closeButton: {
        backgroundColor: '#f44',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
