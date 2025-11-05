/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import LineBreak from './LineBreak';
import AppText from './AppText';

type Prop = {
    pageHead?: string;
    space?: number;
    subTitle?: string;
}

const AuthHeader = ({ pageHead, space, subTitle }: Prop) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ backgroundColor: AppColors.ThemeColor, paddingVertical: responsiveHeight(0.5), width: responsiveWidth(40), borderRadius: 10 }}>
                <Text
                    style={{
                        fontFamily: 'BevanItalic',
                        fontSize: responsiveFontSize(1.5),
                        textAlign: 'center',
                    }}
                >
                    EASY LAND
                </Text>
                <Text
                    style={{
                        fontFamily: 'BevanItalic',
                        fontSize: responsiveFontSize(1.5),
                        textAlign: 'center',
                    }}
                >
                    MAINTENANCE
                </Text>
            </View>
            <LineBreak space={space ? space : 2.5} />
            <AppText
                title={pageHead}
                textColor={AppColors.BLACK}
                textFontWeight
                textSize={3.5}
            />
            {subTitle && <LineBreak space={2.5} />}
            {subTitle && <AppText
                title={subTitle}
                textSize={1.5}
                textFontWeight
                textAlignment={'center'}
                textColor={AppColors.GRAY}
            />}
        </View>
    );
};

export default AuthHeader;