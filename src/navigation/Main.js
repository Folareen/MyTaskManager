import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from '../../firebase.config';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Hello = () => {
    const handleLogout = () => {
        auth
            .signOut()
            .then( async () => {
                await AsyncStorage.removeItem('user')
                // setUser(null);
                // dispatch(setUser(null))
                alert("Bye!");
            })
            .catch((error) => {
                console.log(error, 'logout error!')
                alert("Error!, failed to sign out")
            });
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity onPress={handleLogout}>
                <Text>
                    logout
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const Tabs = createBottomTabNavigator();


const Main = () => {

    return <Tabs.Navigator>
        <Tabs.Screen name="Home" component={Hello} />
    </Tabs.Navigator>


    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="Home"
                component={HomeScreenStack}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="Plan"
                component={PlanScreenStack}
                options={{
                    tabBarLabel: "Plan",
                    tabBarIcon: () => (
                        <MaterialIcons name="event-available" size={24} color="black" />
                    ),
                    headerShown: false,
                }}
            />
        </Tabs.Navigator>
    )
}

export default Main