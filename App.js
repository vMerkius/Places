import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/Auth/LoginScreen";
import RegisterScreen from "./components/Auth/RegisterScreen";
import HomeScreen from "./components/Home/HomeScreen";
import ReviewScreen from "./components/Review/ReviewScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
