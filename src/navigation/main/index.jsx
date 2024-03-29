import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStack from './HomeStack';
import PlanStack from './PlanStack';
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const Tabs = createBottomTabNavigator();

const Main = () => {

    const navigation = useNavigation()

    const {
        addBtn,
        addIcon,
        addBtnContainer,
    } = styles

    return (
        <>

            <Tabs.Navigator
                tabBarOptions={{
                    style: {
                        height: 60,
                        backgroundColor: "#fff",
                        borderTopWidth: 0,
                        elevation: 0,
                        marginTop: 5,
                    },
                    labelStyle: {
                        fontSize: 14,
                    },
                    activeTintColor: "#1D89C5",
                    inactiveTintColor: "#000",
                }}
            >
                <Tabs.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="PlanStack"
                    component={PlanStack}
                    options={{
                        tabBarLabel: "Plan",
                        tabBarIcon: () => (
                            <MaterialIcons name="event-available" size={24} color="black" />
                        ),
                        headerShown: false,
                    }}
                />
            </Tabs.Navigator>
            

            <View style={addBtnContainer}>
                <TouchableOpacity
                    style={addBtn}
                    onPress={() =>{navigation.navigate('AddTask')
                    }}
                >
                    <Ionicons name="add-circle" style={addIcon} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Main

const styles = StyleSheet.create({
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
        bottom: 15,
        zIndex: 120,
        width: "100%",
        // backgroundColor: "red",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        flexDirection: "row",
    }
})