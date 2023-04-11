import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Category from "../../components/Category";
import Task from "../../components/Task";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { db } from "../../../firebase.config";
import { useNavigation } from '@react-navigation/native'
import { collection, addDoc, serverTimestamp, orderBy, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'


const ViewTasks = () => {
  const { user } = useSelector(state => state.auth);
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
    statusBtn,
    activeStatusBtn
  } = styles;

  const categories = ["exercise", "date", "study", "work", "shopping", "other"];

  const today = new Date().toISOString().slice(0, 10);

  const [tasks, fetching] = useCollection(query(collection(db, user.user.uid), where('date', '==', today)));
  const [displayedTasks, setDisplayedTasks] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('')

  const [prevCard, setPrevCard] = useState(null)

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!tasks) return
    setDisplayedTasks(tasks?.docs)
    setFilterStatus('all')
  }, [tasks])

  useEffect(() => {
    if (filterStatus == 'all') {
      setDisplayedTasks(tasks?.docs)
      return
    }
    if (filterStatus == 'pending') {
      setDisplayedTasks(tasks?.docs.filter(task => task.data().status == 'pending'))
      return
    }
    if (filterStatus == 'completed') {
      setDisplayedTasks(tasks?.docs.filter(task => task.data().status == 'completed'))
      return
    }
    if (filterStatus == 'overdue') {
      setDisplayedTasks(tasks?.docs.filter(task => task.data().timeRange.endTime.toDate().getTime() < new Date().getTime() && task.data().status == 'pending'))
      return
    }
  }, [filterStatus])


  const navigation = useNavigation()

  return (
    <View style={container}>
      <View style={profileBox}>
        <Image
          style={profileImg}
          source={require("../../assets/defaultAvatar.png")}
        />
        <View style={profileNameBox}>
          <Text style={profileHeader}>Welcome back,</Text>
          <Text style={profileName}>{user.user.displayName}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.push("Profile")}>
          <Entypo name="menu" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={taskAmount}>
        you have <Text style={taskAmountHighlight}>{tasks?.docs?.length} tasks</Text>{" "}
        this week
      </Text>

      <View style={searchBox}>
        <Feather name="search" size={24} color="black" style={searchIcon} />
        <TextInput style={searchInput} placeholder="Find your task" />
      </View>

      <View style={categoryHeaderBox}>
        <Text style={categoryHeader}>Categories</Text>
      </View>

      <View>
        <ScrollView horizontal={true} style={categoriesBox}>
          {categories.map((each) => (
            <TouchableOpacity
              key={each}
              style={[
                filterCategory == each
                  ? {
                    backgroundColor: "lightblue",
                    padding: 5,
                    borderRadius: 5,
                  }
                  : {}
                , { marginRight: 10 }]}
            >
              <Category name={each} isInTask={false} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>


      <Text style={todayTaskHeader}>Today's task({tasks?.docs?.length})</Text>
      <View style={{ flexDirection: 'row' }}>
        {
          ['all', 'pending', 'completed', 'overdue'].map(
            (status) => (
              <TouchableOpacity onPress={() => {
                setFilterStatus(status)
              }} style={filterStatus == status ? activeStatusBtn : statusBtn}>
                <Text style={[{ fontSize: 12, paddingHorizontal: 12, paddingVertical: 4, textTransform: 'capitalize' }, filterStatus == status ? { color: 'white' } : { color: 'rgba(17, 15, 15, 0.8)' }]}>{status}</Text>
              </TouchableOpacity>
            ))
        }
      </View>



      <>
        {fetching ? (
          <Text
            style={{ marginVertical: 10, fontSize: 18, fontStyle: "italic" }}
          >
            Loading tasks...
          </Text>
        ) : (
          <ScrollView >
            {displayedTasks?.length === 0 ? (
              <Text style={{ marginVertical: 10 }}>No task found...</Text>
            ) : (
              <>
                {displayedTasks?.map((doc) => (
                  <Task id={doc.id} icon={doc.data().category} name={doc.data().name} duration={doc.data().timeRange} prevCard={prevCard} setPrevCard={setPrevCard} setSubmitting={setSubmitting} />
                ))}
              </>
            )}
          </ScrollView>
        )}
      </>

      {
        submitting && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', height: Dimensions.get('window').height, width: Dimensions.get('window').width, zIndex: 9999, bottom: 0 }}>
            <Text style={{ color: 'blue', backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
              Please wait...
            </Text>
          </View>
        )
      }


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
    height: 60,
    width: 60,
    borderRadius: 10
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
  categoryBtn: { marginHorizontal: 10 },
  categoriesBox: {
    flexDirection: "row",
    marginVertical: 10,
  },
  todayTaskHeader: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 20,
  },
  statusBtn: {
    color: 'rgba(17, 15, 15, 0.8)',
    marginRight: 5
  },
  activeStatusBtn: {
    backgroundColor: '#1D89C5',
    marginRight: 5,
    borderRadius: 5
  }
});
