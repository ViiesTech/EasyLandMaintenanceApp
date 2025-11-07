/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AppColors from '../utils/AppColors';

type Prop = {
    value?: any,
    setValue?:any,
}

const AppDropDown = ({value, setValue}: Prop) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Pest Control"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                listItemLabelStyle={{ color: '#333' }}
                labelStyle={{ color: '#000', fontWeight: '500' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dropdown: {
        backgroundColor: AppColors.inputBgColor,
        minHeight: 45,
        borderWidth: 0,
    },
    dropdownContainer: {
        borderColor: '#ccc',
    },
});

export default AppDropDown;
