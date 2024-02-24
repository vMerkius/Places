import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Star from "./Star";

const Rating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);

  return (
    <View style={styles.ratingContainer}>
      {[...Array(totalStars)].map((_, index) => {
        const filled = index < rating;
        return (
          <Star
            key={index}
            filled={filled}
            onPress={() => setRating(index + 1)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Rating;
