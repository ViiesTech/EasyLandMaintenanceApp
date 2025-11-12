/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View,
    Modal,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import { AppImages } from '../assets/images';
import AppColors from '../utils/AppColors';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import LineBreak from './LineBreak';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import ProfileCard from './ProfileCard';
import LeftIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const recommendedImages = [
    { id: 1, image: AppImages.user },
    { id: 2, image: AppImages.step_three },
    { id: 3, image: AppImages.step_one },
]

type Props = {
    visible?: boolean,
    setVisible?: any,
    confirmBookingHandlePress?: any,
}

const ConfirmBookingModal = ({ visible, setVisible, confirmBookingHandlePress }: Props) => {
    const nav = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmTime = (date) => {
        console.warn("A date has been picked: ", date);
        setTime(date)
        hideTimePicker();
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date)
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            {/* Custom Modal */}
            <Modal
                visible={visible}
                transparent
                animationType="fade"  // 👈 no animation
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
                    onPress={() => nav.goBack()}
                >
                    <LeftIcon
                        name="chevron-left"
                        size={responsiveFontSize(3)}
                        color={AppColors.LIGHTGRAY}
                    />
                </TouchableOpacity>

                {/* Background Overlay */}
                <View
                    style={styles.overlay}
                >
                    <View style={styles.bottomModal}>
                        <ProfileCard />

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, paddingVertical: responsiveHeight(2), borderTopWidth: 1, borderBottomWidth: 1, borderColor: AppColors.LIGHTGRAY, paddingHorizontal: responsiveWidth(4) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                {recommendedImages.map((item, index) => (
                                    <View key={index} style={{
                                        marginLeft: index !== 0 ? -15 : 0,
                                    }}>
                                        <Image source={item.image} style={{ width: 45, height: 45, borderRadius: 100, }} />
                                    </View>
                                ))}
                            </View>

                            <View >
                                <AppText
                                    title={'25 Recommended'}
                                    textSize={2}
                                    textColor={AppColors.BLACK}
                                />
                                <AppText
                                    title={'Typically reply in 30 seconds'}
                                    textSize={1.6}
                                    textColor={AppColors.GRAY}
                                />
                            </View>
                        </View>

                        <LineBreak space={1} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(4) }}>
                            <AppText
                                title={'Price'}
                                textSize={2.2}
                                textColor={AppColors.BLACK}
                                textFontWeight
                            />

                            <AppText
                                title={'$49.00'}
                                textSize={2.5}
                                textColor={AppColors.BLACK}
                                textFontWeight
                            />
                        </View>

                        <LineBreak space={1} />

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />

                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirmTime}
                            onCancel={hideTimePicker}
                        />

                        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
                            <AppText
                                title={'Preferred Schedule'}
                                textSize={2.2}
                                textColor={AppColors.BLACK}
                            />
                        </View>
                        <LineBreak space={1} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(4) }}>
                            <TouchableOpacity onPress={showDatePicker}>
                                <AppTextInput logo={
                                    <Icon name="calendar-o" size={responsiveFontSize(2.5)} color={AppColors.BLACK} />
                                } inputPlaceHolder={'Pick a Date'} value={date ? new Date(date).toISOString().split('T')[0] : null} editable={false} inputWidth={28} placeholderTextColor={AppColors.BLACK} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showTimePicker}>
                                <AppTextInput logo={
                                    <Icon name="clock-o" size={responsiveFontSize(2.8)} color={AppColors.BLACK} />
                                } inputPlaceHolder={'Pick a Time'} editable={false} value={time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : null} inputWidth={28} placeholderTextColor={AppColors.BLACK} />
                            </TouchableOpacity>
                        </View>
                        <LineBreak space={2} />

                        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
                            <AppButton title={'Confirm Booking'} handlePress={confirmBookingHandlePress} buttoWidth={82} bgColor={AppColors.ThemeColor} textColor={AppColors.BLACK} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ConfirmBookingModal;

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
