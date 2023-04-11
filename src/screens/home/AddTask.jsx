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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import { db } from "../../../firebase.config";
import { FontAwesome5 } from "@expo/vector-icons";
import { formatTime } from "../../utils/formatTime";

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
  const [timeRange, setTimeRange] = useState("");

  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [startTime, setStartTime] = useState(new Date())
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [endTime, setEndTime] = useState(new Date())
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const onStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowStartTimePicker(false);
    setStartTime(currentDate);
  };
  const onEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowEndTimePicker(false);
    setEndTime(currentDate);
  };

  const { user } = useSelector(state => state.auth)

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!category || !name || !date || !startTime || !endTime)
      return alert("Error!... please fill all fields!");
    setSubmitting(true);
    db.collection(user.user.uid)
      .add({
        category,
        name,
        date: date.toISOString().slice(0, 10),
        timeRange: { startTime, endTime },
        status: 'pending'
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

  const onDateChange = (event, selectedDate) => {
    console.log(selectedDate, 'selected date')
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
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
        <TouchableOpacity
          style={dateFieldBox}
          onPress={() => setShowDatePicker(true)}
        >
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontWeight: "bold" }}>Day</Text>
            <Text
              style={dateField}
            >
              {date.getDate()}
            </Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontWeight: "bold" }}>Month</Text>
            <Text
              style={dateField}
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ][date.getMonth() + 1]}
            </Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontWeight: "bold" }}>Year</Text>
            <Text
              placeholder={"e.g 2015"}
              style={dateField}
            >
              {date.getFullYear()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={inputContainer}>
        <Text style={inputLabel}>Task time range</Text>
        <View style={dateFieldBox}>
          <View style={{ flex: 0.45 }}>
            <Text style={{ fontWeight: "bold" }}>Start Time</Text>
            <TouchableOpacity
              onPress={() => setShowStartTimePicker(true)}
              style={{ marginRight: 10 }}
            >
              <Text
                style={inputField}
              >
                {formatTime(startTime)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 0.45 }}>
            <Text style={{ fontWeight: "bold" }}>End Time</Text>
            <TouchableOpacity
              onPress={() => setShowEndTimePicker(true)}
            >
              <Text
                style={inputField}
              >
                {formatTime(endTime)}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>


      <TouchableOpacity
        style={[button, submitting ? { backgroundColor: "grey" } : {}]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={buttonText}>
          {submitting ? "please wait..." : "add task"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={false}
          onChange={onDateChange}
        />
      )}
      {showStartTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startTime}
          mode={"time"}
          is24Hour={false}
          onChange={onStartTimeChange}
        />
      )}
      {showEndTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endTime}
          mode={"time"}
          is24Hour={false}
          onChange={onEndTimeChange}
        />
      )}
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
    padding: 15,
    borderColor: "rgba(195, 187, 187, 1)",
    borderWidth: 1,
    borderRadius: 10,
  },
  dateFieldBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateField: {
    padding: 15,
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
