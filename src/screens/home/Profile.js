import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const {
    container,
    profileContainer,
    taskStatCard,
    name,
    profileImg,
    taskStatCardContainer,
    statValue,
    statTitle,
    imgContainer,
    logBtn,
    logBtnText,
    settingsBtn,
    settingsBtnText,
  } = styles;

  const dispatch = useDispatch()

  const {user} = useSelector(state => state.auth)

 const logout = () => {
    auth
      .signOut()
      .then(() => {
        await AsyncStorage.removeItem('user')
        // setUser(null);
        dispatch(setUser(null))
        alert("Bye!");
      })
      .catch(() => alert("Error!, failed to sign out"));
  };

  return (
    <View style={container}>
      <View style={profileContainer}>
        <View style={imgContainer}>
          <Image
            style={profileImg}
            source={require("../../assets/defaultAvatar.png")}
          />
        </View>

        <Text style={name}>{user.displayName}</Text>

        <View style={taskStatCardContainer}>
          {[
            { title: "weekly task", value: "10-20" },
            { title: "monthly task", value: "300-600" },
          ].map(({ title, value }) => (
            <View style={taskStatCard}>
              <Text style={statTitle}>{title}</Text>
              <Text style={statValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={settingsBtn}>
        <Text style={settingsBtnText}>Set Reminder</Text>
      </View>
      <View style={settingsBtn}>
        <Text style={settingsBtnText}>Set Notification</Text>
      </View>
      <View style={settingsBtn}>
        <Text style={settingsBtnText}>Dark Mode</Text>
      </View>

      <TouchableOpacity style={logBtn} onPress={logout}>
        <Entypo
          name="log-out"
          size={24}
          color="black"
          style={{ marginRight: 5 }}
        />
        <Text style={logBtnText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  profileContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
  },
  imgContainer: {
    width: "100%",
    marginTop: -60,
    flexDirection: "row",
    justifyContent: "center",
  },
  profileImg: {
    textAlign: "center",
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  taskStatCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskStatCard: {
    backgroundColor: "rgba(228, 233, 236, 1)",
    padding: 15,
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 15,
  },
  statValue: {
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  statTitle: {
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  logBtn: {
    borderColor: "rgba(195, 187, 187, 1)",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logBtnText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  settingsBtn: {
    borderColor: "rgba(195, 187, 187, 1)",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  settingsBtnText: { fontWeight: "bold" },
});
