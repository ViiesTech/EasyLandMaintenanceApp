/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import AppText from './AppText'
import AppColors from '../utils/AppColors'
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions'
import LineBreak from './LineBreak'

type Props = {
    label?: string,
    children?: ReactNode
}

const LabelContainer = ({ label, children }: Props) => {
    return (
        <View style={{ borderWidth: 1, paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1), borderColor: AppColors.LIGHTGRAY, borderRadius: 10 }}>
            <AppText
                title={label}
                textSize={2}
                textColor={AppColors.BLACK}
            />
            <LineBreak space={0.5} />
            {children}
        </View>
    )
}

export default LabelContainer