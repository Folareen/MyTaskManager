import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const Switch = ({ options, option, setOptions }) => {
  return (
    <TouchableOpacity>
      <Text>On</Text>
      <Text>Off</Text>
    </TouchableOpacity>
  );
};

export default Switch;

const styles = StyleSheet.create({});
