import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Category from "../../components/Category";
import { db } from "../../firebase.config";
import { useSelector } from "react-redux";

const categories = ["exercise", "date", "study", "work", "shopping"];

const AddTask = ({ navigation }) => {
  const {
    container,
    categoryHeader,
    categoriesBox,
    inputContainer,
    inputLabel,
    inputField,
    button,
    buttonText,
    dateFieldBox,
    dateField,
  } = styles;

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [timeRange, setTimeRange] = useState("");

  const {user} = useSelector(state => state.auth)

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!category || !name || !day || !month || !year || !timeRange)
      return alert("Error!... please fill all fields!");
    setSubmitting(true);
    db.collection(user.uid)
      .add({
        category,
        name,
        date: `Friday, ${day}, ${month} ${year}`,
        timeRange,
      })
      .then((docRef) => {
        console.log(docRef);
        alert("Task added!");
        navigation.replace("ViewTasks");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <KeyboardAvoidingView behavior="height" style={container}>
      <Text style={categoryHeader}>choose task category</Text>
      <View style={categoriesBox}>
        {categories.map((each) => (
          <TouchableOpacity
            key={each}
            onPress={() => setCategory(each)}
            style={
              category == each
                ? {
                    backgroundColor: "lightblue",
                    padding: 5,
                    borderRadius: 5,
                  }
                : {}
            }
          >
            <Category name={each} isInTask={false} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={inputContainer}>
        <Text style={inputLabel}>name of task</Text>
        <TextInput
          style={inputField}
          value={name}
          onChangeText={(value) => setName(value)}
        />
      </View>

      <View style={inputContainer}>
        <Text style={inputLabel}>Task's date</Text>
        <View style={dateFieldBox}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontWeight: "bold" }}>Day</Text>
            <TextInput
              placeholder={"e.g 10"}
              style={dateField}
              value={day}
              onChangeText={(value) => setDay(value)}
            />
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontWeight: "bold" }}>Month</Text>
            <TextInput
              placeholder={"e.g August"}
              style={dateField}
              value={month}
              onChangeText={(value) => setMonth(value)}
            />
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontWeight: "bold" }}>Year</Text>
            <TextInput
              placeholder={"e.g 2015"}
              style={dateField}
              value={year}
              onChangeText={(value) => setYear(value)}
            />
          </View>

          {/* {[(title: "Day"), "Month", "Year"].map((input, index) => (
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>{input}</Text>
              <TextInput placeholder={`${input}`} style={dateField} />
            </View>
          ))} */}
        </View>
      </View>

      <View style={inputContainer}>
        <Text style={inputLabel}>Task time range</Text>
        <TextInput
          style={inputField}
          value={timeRange}
          onChangeText={(value) => setTimeRange(value)}
          placeholder="e.g 7am-8pm"
        />
      </View>

      {/* <View style={inputContainer}>
        <Text style={inputLabel}>Reminder</Text>
        <CheckBox style={inputField} />
      </View> */}

      <TouchableOpacity
        style={[button, submitting ? { backgroundColor: "grey" } : {}]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={buttonText}>
          {submitting ? "please wait..." : "add task"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  categoryHeader: {
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "capitalize",
  },
  categoriesBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 25,
  },
  inputLabel: {
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "capitalize",
    marginBottom: 5,
  },
  inputField: {
    padding: 10,
    borderColor: "rgba(195, 187, 187, 1)",
    borderWidth: 1,
    borderRadius: 10,
  },
  dateFieldBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateField: {
    padding: 10,
    borderColor: "rgba(195, 187, 187, 1)",
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "rgba(18, 66, 190, 1)",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
  },
});
