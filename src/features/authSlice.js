import { createSlice } from "@reduxjs/toolkit";

const initialState = {user: null}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log('from authSlice', action.payload)
            state.user = action.payload
        },
        logout : (state) => {
            state.user = null
        }
    }
})

export const {setUser, logout} = authSlice.actions
export default authSlice.reducer