import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Star = ({ filled, onPress }) => {
  let iconName;
  if (filled) {
    iconName = "star";
  } else {
    iconName = "star-o";
  }

  return (
    <TouchableOpacity style={styles.star} onPress={onPress}>
      <Icon name={iconName} size={30} color="#FFD700" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  star: {
    marginRight: 2,
  },
});

export default Star;
