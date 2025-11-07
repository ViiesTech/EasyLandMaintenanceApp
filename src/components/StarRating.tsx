/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating = 0, size = 24, color = '#FFD700' }) => {
  const stars = [];

  // Round down if rating is decimal (e.g., 2.8 → 2)
  const filledStars = Math.floor(rating);

  for (let i = 0; i < filledStars; i++) {
    stars.push(<Icon key={i} name="star" size={size} color={color} />);
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      {stars}
    </View>
  );
};

export default StarRating;
