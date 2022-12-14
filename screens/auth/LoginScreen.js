import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase.config";

const LoginScreen = ({ navigation }) => {
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

  const [submitting, setSubmitting] = useState(false);

  const { setUser } = useContext(AuthContext);

  const handleSubmit = () => {
    if (!email) return alert("Invalid email");
    if (!password) return alert("Invalid password");

    setSubmitting(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user.user);
      })
      .catch((error) => alert(error))
      .finally(() => setSubmitting(false));
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
          placeholder="e.g samuelotuyemi@gmail.com"
        />
      </View>

      <View style={inputContainer}>
        <Text style={inputLabel}>password</Text>
        <TextInput
          value={password}
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
          style={input}
        />
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

export default LoginScreen;

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
    paddingVertical: 5,
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
