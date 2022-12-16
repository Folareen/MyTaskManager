import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import AuthContextProvider from "./context/AuthContext";
import Navigation from "./Navigation";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
