/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions'
import Entypo from 'react-native-vector-icons/Entypo';
import AppColors from '../utils/AppColors';
import SVGXml from './SVGXML';
import AppText from './AppText';

type Props = {
    item: any,
    index: number,
    selectedCard?: any,
    onCardPress?: any,
}

const PayCard = ({ item, index, selectedCard, onCardPress }: Props) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1),
                gap: 20,
                backgroundColor: selectedCard ? AppColors.ThemeColor : AppColors.WHITE,
                alignItems: 'center',
                borderRadius: 15,
            }}
            onPress={onCardPress}
        >
            <SVGXml
                icon={item.icon}
                width={index == 1 ? 45 : 50}
                height={index == 1 ? 45 : 50}
            />
            <AppText
                title={item.title}
                textSize={2}
                textColor={selectedCard ? AppColors.WHITE : AppColors.BLACK}
            />
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Entypo
                    name="chevron-small-right"
                    size={responsiveFontSize(3)}
                    color={selectedCard ? AppColors.WHITE : AppColors.GRAY}
                />
            </View>
        </TouchableOpacity>
    );
};

export default PayCard;