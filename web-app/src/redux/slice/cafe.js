import { createSlice } from "@reduxjs/toolkit";

const cafe = createSlice({
    name: 'cafe',
    initialState: [{
        name: '',
        description: '',
        employees: [],
        location: ''
    }],
    reducers: {
        getCafesSlice: (state, action) => {
            state = action.payload
            return state
        },
        addCafeSlice: (state, action) => {
            state.push(action.payload)
            return state
        },
        editCafeSlice: (state, action) => {
            state = state.map(i => i.id == action.payload.id ? action.payload : i)
            return state
        },
        deleteCafeSlice: (state, action) => {
            state = state.filter(i => i.id !== action.payload)
            return state
        }
    }
})
export const { getCafesSlice, addCafeSlice, editCafeSlice, deleteCafeSlice } = cafe.actions
export default cafe.reducer