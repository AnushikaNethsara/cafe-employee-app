import { createSlice } from "@reduxjs/toolkit";

const employee = createSlice({
    name: 'employee',
    initialState: [{
        name: '',
        email: '',
        phone: '',
        gender: '',
        assignedCafe: '',
    }],
    reducers: {
        getEmployeesSlice: (state, action) => {
            console.log(action.payload)
            state = action.payload
            return state
        },
        addEmployeeSlice: (state, action) => {
            state.push(action.payload)
            return state
        },
        editEmployeeSlice: (state, action) => {
            state = state.map(i => i.id == action.payload.id ? action.payload : i)
            return state
        },
        deleteEmployeeSlice: (state, action) => {
            state = state.filter(i => i.id !== action.payload)
            return state
        },
        getEmployeesByCafeSlice: (state, action) => {
            state = action.payload
            return state
        }
    }
})
export const { getEmployeesSlice, addEmployeeSlice, editEmployeeSlice, deleteEmployeeSlice, getEmployeesByCafeSlice } = employee.actions
export default employee.reducer