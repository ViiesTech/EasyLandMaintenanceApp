/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image, ImageBackground } from 'react-native'
import AppColors from '../utils/AppColors';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import { AppImages } from '../assets/images';
import AppText from './AppText';

const HomeHeader = () => {
    return (
        <ImageBackground source={AppImages.header_bg} style={{ paddingTop: responsiveHeight(2), backgroundColor: AppColors.ThemeColor, height: responsiveHeight(12), width: responsiveWidth(100) }}>

            <View style={{ paddingHorizontal: responsiveWidth(5), flexDirection: 'row', gap: 15, alignItems: 'center', height: responsiveHeight(12) }}>
                <Image source={AppImages.user} style={{ width: 50, height: 50, borderRadius: 100 }} />
                <View>
                    <AppText
                        title={'Welcome to'}
                        textSize={1.5}
                        textColor={AppColors.WHITE}
                    />
                    <AppText
                        title={'Gregory Smith'}
                        textSize={1.7}
                        textColor={AppColors.WHITE}
                        textFontWeight
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

export default HomeHeader;