import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text, TextInput,
  TouchableOpacity, View
} from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase.config";
import { setUser } from "../../features/authSlice";

const Signup = ({ navigation }) => {
  const {
    container,
    header,
    inputContainer,
    inputLabel,
    input,
    button,
    buttonText,
    otherContainer,
    otherLabel,
    otherLink,
  } = styles;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (!fullname) return alert("Invalid name");
    if (!email) return alert("Invalid email");
    if (!password) return alert("Invalid password");
    if (password != confirmPassword) {
      return alert("Passwords do not match");
    }

    setSubmitting(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: fullname,
          })
          .then(async () => {
            dispatch(setUser(user))
            await AsyncStorage.setItem('user', JSON.stringify(user))
          })
          .catch(() => alert("error"));
      })
      .catch((error) => alert(error))
      .finally(() => setSubmitting(false));
  };

  return (
    <View style={container}>
      <Text style={header}>sign up</Text>

      <View style={inputContainer}>
        <Text style={inputLabel}>Fullname</Text>
        <TextInput
          value={fullname}
          onChangeText={(value) => setFullname(value)}
          style={input}
          placeholder="e.g John Doe"
        />
      </View>

      <View style={inputContainer}>
        <Text style={inputLabel}>email</Text>
        <TextInput
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={input}
          placeholder="e.g johndoe@gmail.com"
        />
      </View>

      <View style={inputContainer}>
        <Text style={inputLabel}>password</Text>
        <View style={[input, { flexDirection: 'row', alignItems: 'center' }]}>
          <TextInput
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={!showPassword}
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {
              showPassword ?
                <Ionicons name="eye-off-outline" size={24} color="black" />
                :
                <Ionicons name="eye-outline" size={24} color="black" />
            }
          </TouchableOpacity>
        </View>
      </View>

      <View style={inputContainer}>
        <Text style={inputLabel}>confirm password</Text>
        <View style={[input, { flexDirection: 'row', alignItems: 'center' }]}>
          <TextInput
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            secureTextEntry={showConfirmPassword}
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            {
              showConfirmPassword ?
                <Ionicons name="eye-off-outline" size={24} color="black" />
                :
                <Ionicons name="eye-outline" size={24} color="black" />
            }
          </TouchableOpacity>


        </View>
      </View>

      <TouchableOpacity
        style={[button, submitting ? { backgroundColor: "grey" } : {}]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={buttonText}>
          {submitting ? "please wait..." : "sign up"}
        </Text>
      </TouchableOpacity>

      <View style={otherContainer}>
        <Text style={otherLabel}>forgot password?</Text>
        <Text style={otherLink}>click here</Text>
      </View>

      <View style={otherContainer}>
        <Text style={otherLabel}>have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={otherLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#68add4",
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 48,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },
  inputContainer: {
    marginTop: 30,
  },
  inputLabel: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 17,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  otherContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  otherLabel: {
    textTransform: "uppercase",
    color: "rgba(90, 87, 87, 1)",
    fontWeight: "bold",
  },
  otherLink: {
    marginLeft: 3,
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "rgba(18, 66, 190, 1)",
  },
});
