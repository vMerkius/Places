import React, { useState } from "react";
import { Modal, View, TextInput, Button, StyleSheet } from "react-native";

const AddCategory = ({ isVisible, onAdd, onClose }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = () => {
    onAdd(newCategory);
    setNewCategory("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Nowa kategoria"
            value={newCategory}
            onChangeText={setNewCategory}
            style={styles.textInput}
          />
          <Button title="Dodaj" onPress={handleAdd} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    width: 300,
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddCategory;
