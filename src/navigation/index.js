import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/authSlice'
import Auth from './Auth'
import Main from './Main'
import { auth } from '../../firebase.config'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Navigation = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [authenticating, setAuthenticating] = useState(true)

    useEffect(
        () => {

            const unsubscribe = auth.onAuthStateChanged(
                async (user) => {
                    setAuthenticating(false)

                    if (user) {
                        // dispatch(setUser(user.providerData[0]));
                        await AsyncStorage.removeItem('user')
                        await AsyncStorage.setItem('user', JSON.stringify(user))
                        dispatch(setUser(user))
                        console.log('reset user!')
                    } else {
                        const storedUser = await AsyncStorage.getItem('user')
                        if (storedUser) {
                            dispatch(setUser(JSON.parse(storedUser)))
                            return
                        }
                        dispatch(setUser(null));
                    }

                }
            )
            // setAuthenticating(false)
            return unsubscribe
        }, []
    )

    if (authenticating) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <Text style={{ color: 'blue' }}>
                Loading...
            </Text>
        </View>
    }

    return (
        <NavigationContainer>
            {
                user ?
                    <Main />
                    :
                    <Auth />
            }
        </NavigationContainer>
    )
}

export default Navigation