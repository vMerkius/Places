import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";

const RegisterScreen = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    Alert.alert("Rejestracja", `Nickname: ${nickname}, Password: ${password}`);
  };
  const handleGoToLogin = () => {
    console.log("sd");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Nie mam konta" onPress={handleGoToLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});

export default RegisterScreen;
