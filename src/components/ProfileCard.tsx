/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions'
import AppColors from '../utils/AppColors'
import { AppImages } from '../assets/images'
import AppText from './AppText'
import Icon from 'react-native-vector-icons/FontAwesome';
import SVGXml from './SVGXML'
import { AppIcons } from '../assets/icons'
import { useNavigation } from '@react-navigation/native'

type Props = {
    chatBgColor?: any,
}

const ProfileCard = ({chatBgColor}: Props) => {
    const nav = useNavigation();
    return (
        <View style={{ paddingVertical: responsiveHeight(2), backgroundColor: AppColors.LightestGray, flexDirection: 'row', alignItems: 'center', gap: 15, paddingHorizontal: responsiveWidth(4) }}>
            <Image source={AppImages.user} style={{ width: 60, height: 60, borderRadius: 100 }} />
            <View>
                <AppText
                    title={'Leon Carroll'}
                    textSize={2.5}
                    textFontWeight
                    textColor={AppColors.BLACK}
                />
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <Icon name="star" size={responsiveFontSize(2)} color={'#FFD700'} />
                    <AppText
                        title={'2.5'}
                        textSize={2}
                        textColor={AppColors.GRAY}
                    />
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', gap: 8, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => nav.navigate("Messages")} style={{ backgroundColor: chatBgColor ? chatBgColor : AppColors.ThemeColor, justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 100 }}>
                    <SVGXml icon={AppIcons.message} width={35} height={35} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav.navigate("IncomingCall")} style={{ backgroundColor: AppColors.ThemeColor, justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 100 }}>
                    <SVGXml icon={AppIcons.contact} width={25} height={25} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileCard;