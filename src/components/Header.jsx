import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View>
      <Text style={styles.header}>MyTaskManager</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    color: "darkblue",
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "lightblue",
    padding: 10,
    textAlign: "center",
  },
});
