/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image, ImageBackground } from 'react-native'
import AppColors from '../utils/AppColors';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import { AppImages } from '../assets/images';
import AppText from './AppText';
import HeaderWithBack from './HeaderWithBack';
import LineBreak from './LineBreak';

type Props = {
    homeHead?: boolean,
    title?: string,
}

const HomeHeader = ({ homeHead = true, title }: Props) => {
    return (
        <ImageBackground source={AppImages.header_bg} style={{ paddingTop: responsiveHeight(2), backgroundColor: AppColors.ThemeColor, height: homeHead ? responsiveHeight(12) : responsiveHeight(10), width: responsiveWidth(100) }}>

            {homeHead && <View style={{ paddingHorizontal: responsiveWidth(5), flexDirection: 'row', gap: 15, alignItems: 'center', height: responsiveHeight(12) }}>
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
            </View>}
            {!homeHead && <HeaderWithBack bgColor={'transparent'} color={AppColors.BLACK} title={title} />}
        </ImageBackground>
    );
};

export default HomeHeader;