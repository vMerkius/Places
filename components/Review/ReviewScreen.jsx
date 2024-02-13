import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AddCategory from "./AddCategory"; // Zakładamy, że AddCategory jest twoim komponentem modalnym

function ReviewScreen({ route }) {
  const { place } = route.params;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Jedzenie", value: "jedzenie" },
    { label: "Zwiedzanie", value: "zwiedzanie" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const addCategory = (category) => {
    const newCategoryTrimmed = category.trim();
    if (newCategoryTrimmed) {
      setItems([
        ...items,
        { label: newCategoryTrimmed, value: newCategoryTrimmed.toLowerCase() },
      ]);
    }
  };

  return (
    <View style={styles.container}>
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
    position: "absolute",
    right: 10,
    top: 10,
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
