import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import Category from "./Category";
import { formatTime } from "../utils/formatTime";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../../firebase.config";
import { useSelector } from "react-redux";

const Task = ({ id, name, icon, duration: { startTime, endTime }, prevCard, setPrevCard, setSubmitting }) => {
  const { taskBox, taskNameBox, taskName, taskDuration } = styles;
  const { user } = useSelector(state => state.auth)


  const handleMarkAsDone = () => {
    setSubmitting(true);
    db.collection(user.user.uid).doc(id)
      .update({
        status: 'completed'
      })
      .then((docRef) => {
        console.log(docRef);
        alert("Task marked as completed!");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => setSubmitting(false));
  };

  const handleDelete = () => {
    setSubmitting(true);
    db.collection(user.user.uid).doc(id).delete()
      .then((docRef) => {
        console.log(docRef);
        alert("Task deleted!");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => setSubmitting(false));
  };

  const cardRef = useRef(null)

  const closePrev = () => {
    if (prevCard != cardRef && prevCard?.current != null) {
      prevCard.current.close()
    }
    setPrevCard(cardRef)
  };

  const renderRightActions = (progress, dragX) => {
    return (
      <View
        style={{
          margin: 0,
          alignItems: "center",
          flexDirection: "row",
          width: 150,
          paddingHorizontal: 10,
          backgroundColor: '#242531',
          marginVertical: 10,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
        >
          <MaterialCommunityIcons name="pencil-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleMarkAsDone}
        >
          <FontAwesome5 name="check-circle" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
        >
          <Ionicons name="ios-trash-bin" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      
      <Swipeable
        ref={cardRef}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX)
        }
        onSwipeableOpen={closePrev}
      >
        <View style={taskBox}>
          <Category isInTask={true} name={icon} />
          <View style={taskNameBox}>
            <Text style={taskName}>{name}</Text>
            <Text style={taskDuration}>{formatTime(startTime.toDate())} - {formatTime(endTime.toDate())}</Text>
          </View>
        </View>

      </Swipeable>
    </GestureHandlerRootView>
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
