import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Category = ({ name, isInTask }) => {
  const { categoryBox, categoryIcon, categoryName, notInTask } = styles;
  if (name === "exercise") {
    return (
      <View style={categoryBox}>
        <MaterialIcons
          name="fitness-center"
          style={[categoryIcon, isInTask ? {} : notInTask]}
        />
        {!isInTask && <Text style={categoryName}>{name}</Text>}
      </View>
    );
  }
  if (name === "date") {
    return (
      <View style={categoryBox}>
        <FontAwesome5
          name="people-arrows"
          style={[categoryIcon, isInTask ? {} : notInTask]}
        />
        {!isInTask && <Text style={categoryName}>{name}</Text>}
      </View>
    );
  }
  if (name === "study") {
    return (
      <View style={categoryBox}>
        <FontAwesome5
          name="book-reader"
          style={[categoryIcon, isInTask ? {} : notInTask]}
        />
        {!isInTask && <Text style={categoryName}>{name}</Text>}
      </View>
    );
  }
  if (name === "work") {
    return (
      <View style={categoryBox}>
        <MaterialIcons
          name="work"
          style={[categoryIcon, isInTask ? {} : notInTask]}
        />
        {!isInTask && <Text style={categoryName}>{name}</Text>}
      </View>
    );
  }
  if (name === "shopping") {
    return (
      <View style={categoryBox}>
        <AntDesign
          name="shoppingcart"
          style={[categoryIcon, isInTask ? {} : notInTask]}
        />
        {!isInTask && <Text style={categoryName}>{name}</Text>}
      </View>
    );
  }
  if (name === "other") {
    return (
      <View style={categoryBox}>
        <FontAwesome5 name="tasks" size={24} color="black"
          style={[categoryIcon, isInTask ? {} : notInTask]}
        />
        {!isInTask && <Text style={categoryName}>{name}</Text>}
      </View>
    );
  }
};

export default Category;

const styles = StyleSheet.create({
  categoryBox: {},
  categoryIcon: {
    fontSize: 30,
    color: "rgba(18, 66, 190, 1)",
    padding: 10,
  },
  notInTask: {
    borderWidth: 0.75,
    borderColor: "rgba(195, 187, 187, 1)",
    borderRadius: 120,
    padding: 10,
    textAlign: "center",
  },
  categoryName: {
    textTransform: "capitalize",
    color: "rgba(17, 15, 15, 0.8)",
    textAlign: "center",
  },
});
