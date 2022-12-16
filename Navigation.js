import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenStack from "./screens/home";
import PlanScreen from "./screens/PlanScreen";
import LandingScreen from "./screens/auth/LandingScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PlanScreenStack from "./screens/plan";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const Navigation = () => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <Tabs.Navigator>
          <Tabs.Screen
            name="Home"
            component={HomeScreenStack}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="Plan"
            component={PlanScreenStack}
            options={{
              tabBarLabel: "Plan",
              tabBarIcon: () => (
                <MaterialIcons name="event-available" size={24} color="black" />
              ),
              headerShown: false,
            }}
          />
        </Tabs.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="LandingScreen"
            component={LandingScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={SignupScreen}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Navigation;
