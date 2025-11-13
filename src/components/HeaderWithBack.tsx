/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import AppText from './AppText';
import { useNavigation } from '@react-navigation/native';

type Props = {
    title?: string,
}

const HeaderWithBack = ({ title }: Props) => {
    const nav = useNavigation();

    const onBackPress = () => {
        nav.goBack();
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(2),
                backgroundColor: AppColors.WHITE,
                justifyContent: 'center',
            }}
        >
            <TouchableOpacity
                onPress={onBackPress}
                style={{
                    position: 'absolute',
                    left: responsiveWidth(4),
                    zIndex: 10,
                }}
                activeOpacity={0.7}
            >
                <Feather
                    name="arrow-left"
                    size={responsiveFontSize(3)}
                    color={AppColors.GRAY}
                />
            </TouchableOpacity>

            <AppText title={title} textSize={2.2} textColor={AppColors.BLACK} />
        </View>
    );
};

export default HeaderWithBack;
