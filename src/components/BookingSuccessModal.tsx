/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import LineBreak from './LineBreak';
import AppText from './AppText';

type Props = {
    visible?: boolean,
    setVisible?: any,
    cancelHandlePress?: any,
    doneHandlePress?: any,
}


const BookingSuccessModal = ({ visible, setVisible, cancelHandlePress, doneHandlePress }: Props) => {
    return (
        <View style={styles.container}>
            {/* Custom Modal */}
            <Modal
                visible={visible}
                transparent
                animationType="fade"  // 👈 no animation
                onRequestClose={() => setVisible(false)}
            >
                {/* Background Overlay */}
                <View
                    style={styles.overlay}
                >
                    <View style={styles.bottomModal}>
                        <LineBreak space={2} />
                        <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: 100, height: 100, borderRadius: 100, backgroundColor: AppColors.ThemeColor }}>
                            <Icon name="check" size={responsiveFontSize(8)} color={AppColors.WHITE} />
                        </View>
                        <LineBreak space={2} />
                        <AppText
                            title={'Booking Successful'}
                            textSize={2.2}
                            textColor={AppColors.BLACK}
                            textFontWeight
                            textAlignment={'center'}
                        />
                        <LineBreak space={2} />
                        <AppText
                            title={'Your booking has been confirmed. Landscaper will arrive your house with in 20 minutes.'}
                            textSize={1.8}
                            textColor={AppColors.GRAY}
                            textwidth={60}
                            lineHeight={2.6}
                            textAlignment={'center'}
                        />

                        <LineBreak space={2} />

                        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: AppColors.LIGHTGRAY, justifyContent: 'space-between', flex: 1, paddingVertical: responsiveHeight(3), alignItems: 'center', paddingHorizontal: responsiveWidth(20) }}>
                            <TouchableOpacity onPress={cancelHandlePress}>
                                <AppText
                                    title={'Cancel'}
                                    textSize={2.2}
                                    textColor={AppColors.GRAY}
                                    textFontWeight
                                />
                            </TouchableOpacity>
                            <View style={{ borderWidth: 1, borderColor: AppColors.LIGHTGRAY, height: responsiveHeight(9) }} />
                            <TouchableOpacity onPress={doneHandlePress}>
                                <AppText
                                    title={'Done'}
                                    textSize={2.2}
                                    textColor={AppColors.ThemeColor}
                                    textFontWeight
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

export default BookingSuccessModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    openButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.28)',
    },
    bottomModal: {
        borderRadius: 15,
        backgroundColor: AppColors.WHITE,
        width: responsiveWidth(90),
        height: responsiveHeight(40),
        alignSelf: 'center',
        elevation: 5,
    },
    dragBar: {
        width: 50,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#ccc',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    text: {
        color: '#666',
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#4CAF50',
        marginTop: 15,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 25,
    },
    closeText: {
        color: '#fff',
        fontWeight: '600',
    },
});
