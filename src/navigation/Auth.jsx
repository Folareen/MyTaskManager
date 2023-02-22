import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Landing from '../screens/auth/Landing'
import Login from '../screens/auth/Login'
import Signup from '../screens/auth/Signup'

const Stack = createNativeStackNavigator()

const Auth = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Landing"
                component={Landing}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Signup"
                component={Signup}
            />
        </Stack.Navigator>
    )
}

export default Auth