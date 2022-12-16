import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ViewPlans = () => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>ViewPlans</Text>
    </View>
  );
};

export default ViewPlans;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
