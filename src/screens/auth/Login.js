import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";
import {
  StyleSheet,
  Text, TextInput,
  TouchableOpacity, View
} from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase.config";
import { setUser } from "../../features/authSlice";

const Login = ({ navigation }) => {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    if (!email) return alert("Invalid email");
    if (!password) return alert("Invalid password");

    try {
      setSubmitting(true);
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
      dispatch(setUser(user))
      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      alert(error.message)
    } finally {
      setSubmitting(false)
    }
  };

  return (
    <View style={container}>
      <Text style={header}>login</Text>

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

      <TouchableOpacity
        style={[button, submitting ? { backgroundColor: "grey" } : {}]}
        onPress={handleSubmit}
      >
        <Text style={buttonText}>
          {submitting ? "Please wait..." : "login"}
        </Text>
      </TouchableOpacity>

      <View style={otherContainer}>
        <Text style={otherLabel}>forgot password?</Text>
        <Text style={otherLink}>click here</Text>
      </View>

      <View style={otherContainer}>
        <Text style={otherLabel}>don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace("Signup")}>
          <Text style={otherLink}>sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
