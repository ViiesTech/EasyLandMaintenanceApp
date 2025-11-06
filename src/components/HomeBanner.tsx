/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { ImageBackground } from 'react-native'
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import AppText from './AppText';
import AppButton from './AppButton';

type Prop = {
    image?: object,
    title?: string,
    buttonTitle?: string,
    buttonOnPress?: () => void,
}

const HomeBanner = ({ image, title, buttonTitle, buttonOnPress }: Prop) => {
    return (
        <ImageBackground
            source={image}
            imageStyle={{ borderRadius: 5 }}
            style={{
                height: responsiveHeight(15),
                width: responsiveWidth(90),
                paddingVertical: responsiveHeight(2),
                paddingHorizontal: responsiveWidth(4),
                justifyContent: 'space-between',
            }}
        >
            <AppText
                title={title}
                textSize={2.5}
                textFontWeight
                textwidth={60}
                lineHeight={2.8}
                textColor={AppColors.BLACK}
            />

            <AppButton
                buttoWidth={25}
                padding={8}
                bgColor={AppColors.BLACK}
                textSize={1.5}
                borderRadius={5}
                title={buttonTitle}
                handlePress={buttonOnPress}
            />
        </ImageBackground>
    );
};

export default HomeBanner;