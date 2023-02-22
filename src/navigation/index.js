import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/authSlice'
import Auth from './Auth'
import Main from './Main'

const Navigation = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [authenticating, setAuthenticating] = useState(true)

    useEffect(
        () => {
            (
                async () => {
                    try {
                        setAuthenticating(true)
                        const user = await AsyncStorage.getItem('user')
                        if(user){
                        dispatch(setUser(JSON.parse(user)))
                        } else {
                            dispatch(setUser(null))
                        }
                    } catch (error) {
                        alert(error.message)
                    } finally {
                        setAuthenticating(false)
                    }
                }
            )()
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