/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View } from 'react-native'
import AppColors from '../utils/AppColors'
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions'
import AppText from './AppText'
import LineBreak from './LineBreak'

type Props = {
    topContent?: any,
    bottomContent?: any,
    middleTitle?: any,
}

const ServiceStatus = ({ topContent, bottomContent, middleTitle }: Props) => {
    return (
        <View
            style={{
                backgroundColor: AppColors.ThemeColor,
                height: responsiveHeight(20),
                justifyContent: 'center',
                paddingHorizontal: responsiveWidth(5),
            }}
        >
            {topContent}
            <LineBreak space={1.5} />
            <AppText
                title={middleTitle}
                textSize={3.5}
                textFontWeight
                textColor={AppColors.BLACK}
            />
            <LineBreak space={1.5} />
            {bottomContent}
        </View>
    )
}

export default ServiceStatus