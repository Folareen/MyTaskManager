import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Category from "./Category";
import { formatTime } from "../utils/formatTime";

const Task = ({ name, icon, duration: {startTime, endTime} }) => {
  const { taskBox, taskNameBox, taskName, taskDuration } = styles;
  return (
    <View style={taskBox}>
      <Category isInTask={true} name={icon} />
      <View style={taskNameBox}>
        <Text style={taskName}>{name}</Text>
        <Text style={taskDuration}>{formatTime(startTime.toDate())} - {formatTime(endTime.toDate())}</Text>
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(195, 187, 187, 1)",
    borderWidth: 1.5,
    marginVertical: 10,
    borderRadius: 10,
  },
  taskNameBox: {
    flex: 1,
    borderLeftColor: "rgba(17, 15, 15, 0.7)",
    borderLeftWidth: 0.5,
    padding: 10,
  },
  taskName: {
    textTransform: "capitalize",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  taskDuration: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
});
