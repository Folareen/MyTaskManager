import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const LandingScreen = ({ navigation }) => {
  const { container, header, description, button, buttonText } = styles;
  return (
    <View style={container}>
      <Text style={header}>
        Manage your Everyday{" "}
        <Text
          style={{
            color: "blue",
            fontWeight: "bold",
          }}
        >
          Task{" "}
        </Text>
        List
      </Text>

      <Text style={description}>
        Manage Your Daily Tasks Easily To Increase Your Productivity And Get The
        Most Out Of Each Day.
      </Text>

      <View>
        <TouchableOpacity
          style={button}
          onPress={() => navigation.push("Login")}
        >
          <Text style={buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={button}
          onPress={() => navigation.push("Signup")}
        >
          <Text style={buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#68add4",
    padding: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 36,
    marginVertical: 10,

    fontWeight: "bold",
  },
  description: { marginBottom: 20 },
  button: {
    marginTop: 20,
    backgroundColor: "rgba(18, 66, 190, 1)",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
    // marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
  },
});
