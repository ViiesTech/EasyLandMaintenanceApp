/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import { AppImages } from '../assets/images';
import AppColors from '../utils/AppColors';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import SVGXml from './SVGXML';
import { AppIcons } from '../assets/icons';

const SmallBottomModal = () => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            {/* Open Button */}
            <TouchableOpacity
                style={styles.openButton}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.openButtonText}>Open Small Modal</Text>
            </TouchableOpacity>

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
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, paddingHorizontal: responsiveWidth(4) }}>
                            <Image source={AppImages.user} style={{ width: 60, height: 60, borderRadius: 100 }} />
                            <View>
                                <AppText
                                    title={'Leon Carroll'}
                                    textSize={2.5}
                                    textFontWeight
                                    textColor={AppColors.BLACK}
                                />
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                                    <Icon name="star" size={responsiveFontSize(2)} color={'#FFD700'} />
                                    <AppText
                                        title={'2.5'}
                                        textSize={2}
                                        textColor={AppColors.GRAY}
                                    />
                                </View>
                            </View>
                            <View style={{ width: responsiveWidth(31), flexDirection: 'row', gap: 8, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ backgroundColor: AppColors.ThemeColor, justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 100 }}>
                                    <SVGXml icon={AppIcons.message} width={35} height={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: AppColors.ThemeColor, justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 100 }}>
                                    <SVGXml icon={AppIcons.contact} width={25} height={25} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        {/* <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default SmallBottomModal;

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
        justifyContent: 'flex-end',
        paddingBottom: responsiveHeight(2),
    },
    bottomModal: {
        backgroundColor: '#fff',
        borderRadius: 8,
        width: responsiveWidth(90),
        height: responsiveHeight(30),
        paddingVertical: responsiveHeight(2),
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
