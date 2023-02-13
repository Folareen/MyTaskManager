import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

const LandingScreen = ({ navigation }) => {
  const { container, top, bottom, iconImg, manImg, img, header, description, button, buttonText } = styles;
  return (
    <View style={container}>

      <View style={top}>

        <View style={[iconImg, { alignSelf: 'center', marginBottom: 20, position: 'relative' }]}>
          <Image style={img} source={require('../../assets/WelTop.png')} />

          <View style={{ position: 'absolute', bottom: -2, right: -4 }}>
            <Image source={require('../../assets/WelTopPlus.png')} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
          <View style={iconImg}>
            <Image style={img} source={require('../../assets/WelLeft.png')} />
          </View>
          <View style={manImg}>
            <Image style={img} source={require('../../assets/WelMan.png')} />
          </View>
          <View style={iconImg}>
            <Image style={img} source={require('../../assets/WelRight.png')} />
          </View>
        </View>


      </View>


      <View style={bottom}>
        <Text style={header}>
          Manage your Everyday{" "}
          <Text
            style={{
              color: "blue",
              fontWeight: "bold",
            }}
          >
            Task{" "}
          </Text>
          List
        </Text>

        <Text style={description}>
          Manage Your Daily Tasks Easily To Increase Your Productivity And Get The
          Most Out Of Each Day.
        </Text>

        <View>
          <TouchableOpacity
            style={button}
            onPress={() => navigation.push("Login")}
          >
            <Text style={buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={button}
            onPress={() => navigation.push("Signup")}
          >
            <Text style={buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#68add4",
    // padding: 40,
    flex: 1,
  },
  top: {
    flex: 0.55,
    padding: 40,
    justifyContent: 'center'
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  }, manImg: {
    width: 175,
    height: 250,
  },
  iconImg: {
    width: 45,
    height: 45
  },
  bottom: {
    flex: 0.45,
    backgroundColor: 'white',
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    padding: 30
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "bold",
  },
  description: { marginBottom: 20, fontSize: 16 },
  button: {
    marginTop: 15,
    backgroundColor: "rgba(18, 66, 190, 1)",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 20,
  },
});
