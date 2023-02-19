import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    all : [], pending : [], completed : [], overdue : []
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        
    }
})

// export const {getAllTa}
export default tasksSlice.reducer