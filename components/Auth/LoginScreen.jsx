import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";

const LoginScreen = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    Alert.alert("Logowanie", `Nickname: ${nickname}, Password: ${password}`);
    navigation.replace("Home");
  };
  const handleGoToRegister = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Register" }],
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
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Go to Register" onPress={handleGoToRegister} />
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

export default LoginScreen;
