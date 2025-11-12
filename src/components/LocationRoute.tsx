import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';

const LocationRoute = () => {
  return (
    <View style={styles.container}>
      {/* Start Point */}
      <View style={styles.row}>
        <View style={styles.iconColumn}>
          <View style={styles.startOuterCircle}>
            <View style={styles.startInnerCircle} />
          </View>

          {/* Manual dashed line using dots */}
          <View style={styles.dashContainer}>
            {Array.from({ length: 5 }).map((_, i) => (
              <View key={i} style={styles.dashDot} />
            ))}
          </View>
        </View>

        <Text style={styles.text}>7958 Swift Village</Text>
      </View>

      {/* Destination */}
      <View style={[styles.row, { marginTop: -2 }]}>
        <View style={styles.iconColumn}>
          <Icon name="location-sharp" size={22} color="#F54D5D" />
        </View>
        <Text style={styles.text}>105 William St, Chicago, US</Text>
      </View>
    </View>
  );
};

export default LocationRoute;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: responsiveWidth(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  iconColumn: {
    width: responsiveWidth(8),
    alignItems: 'center',
  },
  startOuterCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#30D988',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#30D988',
  },
  dashContainer: {
    alignItems: 'center',
    height: responsiveHeight(4),
  },
  dashDot: {
    width: 2,
    height: responsiveHeight(0.5),
    backgroundColor: '#BDBDBD',
    marginVertical: 2,
    borderRadius: 1,
  },
  text: {
    fontSize: responsiveFontSize(2),
    color: '#1A1A1A',
    fontWeight: '500',
  },
});
