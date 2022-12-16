import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Category from "../../components/Category";
import Task from "../../components/Task";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";

const ViewTasks = ({ navigation }) => {
  const {
    container,
    profileBox,
    profileImg,
    profileHeader,
    profileNameBox,
    profileName,
    taskAmount,
    taskAmountHighlight,
    searchBox,
    searchIcon,
    searchInput,
    categoryHeaderBox,
    categoryHeader,
    categoryBtn,
    todayTaskHeader,
    categoriesBox,
    addBtn,
    addIcon,
    addBtnContainer,
  } = styles;

  const categories = ["exercise", "date", "study", "work", "shopping"];

  const { user } = useContext(AuthContext);

  return (
    <View style={container}>
      <View style={profileBox}>
        <Image
          style={profileImg}
          source={require("../../assets/profile.png")}
        />
        <View style={profileNameBox}>
          <Text style={profileHeader}>Welcome back,</Text>
          <Text style={profileName}>{user.displayName}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.push("Profile")}>
          <Entypo name="menu" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={taskAmount}>
        you have <Text style={taskAmountHighlight}>12 tasks</Text> this week
      </Text>

      <View style={searchBox}>
        <Feather name="search" size={24} color="black" style={searchIcon} />
        <TextInput style={searchInput} placeholder="Find your task" />
      </View>

      <View style={categoryHeaderBox}>
        <Text style={categoryHeader}>Categories</Text>
        <Text style={categoryBtn}>View all</Text>
      </View>

      <View style={categoriesBox}>
        {categories.map((category) => (
          <TouchableOpacity>
            <Category name={category} isInTask={false} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={todayTaskHeader}>Today's task(5)</Text>

      <View>
        {[
          {
            icon: "exercise",
            name: "exercise at finesse gym",
            duration: "7am - 9am",
          },
          { icon: "work", name: "build task manager", duration: "11am - 2pm" },
          {
            icon: "exercise",
            name: "read about weather change",
            duration: "3pm - 4pm",
          },
        ].map(({ icon, name, duration }) => (
          <Task icon={icon} name={name} duration={duration} />
        ))}
      </View>

      <View style={addBtnContainer}>
        <TouchableOpacity
          style={addBtn}
          onPress={() => navigation.push("AddTask")}
        >
          <Ionicons name="add-circle" style={addIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewTasks;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, position: "relative", zIndex: 3 },
  profileBox: {
    flexDirection: "row",
    marginTop: StatusBar.currentHeight,
  },
  profileImg: {
    marginLeft: -21,
    marginTop: -17,
    marginBottom: -26,
    marginRight: -21,
  },
  profileNameBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  profileHeader: {
    fontSize: 18,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 22,
    textTransform: "capitalize",
  },
  taskAmount: {
    textTransform: "capitalize",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },
  taskAmountHighlight: {
    color: "rgba(18, 66, 190, 1)",
  },
  searchBox: {
    flexDirection: "row",
    borderColor: "rgba(17, 15, 15, 1)",
    borderWidth: 1.5,
    borderRadius: 5,
  },
  searchIcon: {
    padding: 10,
    borderRightColor: "rgba(17, 15, 15, 1)",
    borderRightWidth: 0.75,
  },
  searchInput: { flex: 1, padding: 10 },
  categoryHeaderBox: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryHeader: { fontWeight: "bold", fontSize: 22 },
  categoryBtn: {},
  categoriesBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  todayTaskHeader: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 20,
  },
  addBtn: {
    // width: Dimensions.get("window").width * 0.5,
    // backgroundColor: "red",
    // right: Dimensions.get("window").width * 0.5,
    // transform: [{ translateX: Dimensions.get("window").width * 0.5 }],
  },
  addIcon: {
    fontSize: 64,
    color: "#1D89C5",
  },
  addBtnContainer: {
    position: "absolute",
    bottom: -10,
    zIndex: 5,
    width: "100%",
    // backgroundColor: "red",
    width: Dimensions.get("window").width,
    justifyContent: "center",
    flexDirection: "row",
  },
});
