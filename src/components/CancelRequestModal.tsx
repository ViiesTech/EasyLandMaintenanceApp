/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import ProfileCard from './ProfileCard';
import AppButton from './AppButton';
import AppColors from '../utils/AppColors';
import AppText from './AppText';
import LineBreak from './LineBreak';
import LocationRoute from './LocationRoute';
import SVGXml from './SVGXML';
import { AppIcons } from '../assets/icons';
import LeftIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const userData = [
    { id: 1, title: 'Distance', subTitle: '0.2 km' },
    { id: 2, title: 'Time', subTitle: '2 min' },
    { id: 3, title: 'Price', subTitle: '$49.00' },
]

type Props = {
    visible: any,
    setVisible: any,
    confirmCancelReqHandlePress: any,
}

const CancelRequestModal = ({ visible, setVisible, confirmCancelReqHandlePress }: Props) => {
    const nav = useNavigation()
    return (
        <View style={styles.container}>
            {visible && <View style={{ position: 'absolute', bottom: responsiveHeight(47) }}>
                <View style={{ marginHorizontal: responsiveWidth(4), backgroundColor: AppColors.WHITE, elevation: 5, width: 120, height: 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <AppText
                        title={'Arriving in'}
                        textSize={1.7}
                        textColor={AppColors.GRAY}
                    />
                    <AppText
                        title={'7 min'}
                        textSize={3.5}
                        textColor={AppColors.green}
                    />
                </View>
            </View>}

            {/* Custom Modal */}
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: AppColors.WHITE,
                        elevation: 5,
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: responsiveWidth(4),
                        marginVertical: responsiveHeight(2),
                    }}
                    onPress={() => {
                        setVisible(false);
                        nav.goBack();
                    }}
                >
                    <LeftIcon
                        name="close"
                        size={responsiveFontSize(3)}
                        color={AppColors.LIGHTGRAY}
                    />
                </TouchableOpacity>

                {/* Background Overlay */}
                <View
                    style={styles.overlay}
                >
                    <View style={styles.bottomModal}>
                        <ProfileCard chatBgColor={AppColors.chatBgColor} />

                        <LineBreak space={2} />

                        <LocationRoute />

                        <LineBreak space={2} />

                        <View style={{
                            borderTopWidth: 1, borderTopColor: AppColors.LIGHTGRAY, gap: 10, flexDirection: 'row', paddingTop: responsiveHeight(3),
                            alignItems: 'center', paddingHorizontal: responsiveWidth(5)
                        }}>

                            <View style={{ alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#DCFCE7', borderRadius: 10, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <SVGXml icon={AppIcons.sezer} width={25} height={25} />
                                </View>
                                <LineBreak space={0.5} />
                                <AppText
                                    title={'Plant selection'}
                                    textSize={1.3}
                                    textFontWeight
                                    textColor={AppColors.BLACK}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={userData}
                                    horizontal
                                    contentContainerStyle={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(3) }}
                                    renderItem={({ item }) => (
                                        <View>
                                            <AppText
                                                title={item.title}
                                                textSize={1.5}
                                                textColor={AppColors.GRAY}
                                                textTransform={'uppercase'}
                                                textAlignment={'center'}
                                            />
                                            <LineBreak space={1} />
                                            <AppText
                                                title={item.subTitle}
                                                textSize={1.8}
                                                textFontWeight
                                                textAlignment={'center'}
                                                textColor={AppColors.BLACK}
                                            />
                                        </View>
                                    )}
                                />
                            </View>
                        </View>

                        <LineBreak space={2} />

                        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
                            <AppButton
                                title={'Cancel Request'}
                                handlePress={confirmCancelReqHandlePress}
                                buttoWidth={82}
                                bgColor={AppColors.btnColor}
                                textColor={AppColors.WHITE} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CancelRequestModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: responsiveHeight(45),
        paddingBottom: responsiveHeight(2),
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