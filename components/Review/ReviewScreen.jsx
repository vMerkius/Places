import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AddCategory from "./AddCategory";
import Rating from "./Rating";
import AddFriend from "./AddFriend";

function ReviewScreen({ route }) {
  const { place } = route.params;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Jedzenie", value: "jedzenie" },
    { label: "Zwiedzanie", value: "zwiedzanie" },
  ]);
  const [friends, setFriends] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFriendsVisible, setModalFriendsVisible] = useState(false);

  const addCategory = (category) => {
    const newCategoryTrimmed = category.trim();
    if (newCategoryTrimmed) {
      setItems([
        ...items,
        { label: newCategoryTrimmed, value: newCategoryTrimmed.toLowerCase() },
      ]);
    }
  };
  const addFriends = (friend) => {
    console.log(friend);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalFriendsVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Text>{place.name}</Text>
      <View style={styles.pickerContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          listMode="SCROLLVIEW"
          style={styles.dropdownButtonStyle}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          textStyle={styles.textStyle}
          placeholder="Kategoria"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <AddCategory
        isVisible={modalVisible}
        onAdd={addCategory}
        onClose={() => setModalVisible(false)}
      />
      <AddFriend
        isVisible={modalFriendsVisible}
        onAdd={addFriends}
        onClose={() => setModalFriendsVisible(false)}
      />
      <Text>Ocena</Text>

      <Rating totalStars={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContainer: {
    alignItems: "center",
  },
  dropdownButtonStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    width: 150,
    paddingHorizontal: 10,
  },
  dropDownContainerStyle: {
    backgroundColor: "#fff",
    width: 150,
  },
  textStyle: {
    color: "#000",
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: 50,
    margin: "auto",
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default ReviewScreen;
