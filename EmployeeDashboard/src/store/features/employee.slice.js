import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { closeDeletePopup, closeEmployeePopup } from "./popup.slice";


const initialState = {
    employees: [],
    loading: false,
    error: null
}



export const getEmployeeData = createAsyncThunk(
    "employee/getdata",
    async () => {
        const response = await fetch("http://localhost:5200/api/v1/employee/getemployees")
        const data = await response.json()
        return data.responseData
    }
)

export const postEmployeeData = createAsyncThunk(
    "employee/postdata",
    async (data, { dispatch }) => {
        const response = await fetch("http://localhost:5200/api/v1/employee/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const newdata = await response.json()
        dispatch(getEmployeeData())

        return newdata
    }
)

export const deleteEmployeeData = createAsyncThunk(
    "employee/deletedata",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:5200/api/v1/employee/delete/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Delete failed");
            }

            dispatch(closeDeletePopup());
            dispatch(getEmployeeData())

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateEmployeeData = createAsyncThunk(
    "employee/updatedata",
    async ({ id, data }, { dispatch, rejectWithValue }) => {
        console.log(id , data)
        try {
            const response = await fetch(
                `http://localhost:5200/api/v1/employee/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Update failed");
            }

            dispatch(closeEmployeePopup());
            dispatch(getEmployeeData())

            return result.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getEmployeeData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getEmployeeData.fulfilled, (state, action) => {
            state.loading = false,
                state.employees = action.payload
        })
        builder.addCase(getEmployeeData.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload.message
        })

        //post data
        builder.addCase(postEmployeeData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(postEmployeeData.fulfilled, (state, action) => {
            state.loading = false

        })
        builder.addCase(postEmployeeData.rejected, (state, action) => {
            state.error = action.error.message
        })

        //delete data
        builder.addCase( deleteEmployeeData.pending , (state)=>{
            state.loading = true
        })
        builder.addCase(deleteEmployeeData.fulfilled , (state , action)=>{
             state.loading = false
        })
        builder.addCase(deleteEmployeeData.rejected , (state , action)=>{
            state.loading = true
            state.error = action.error.message
        })

        //update data 
        builder.addCase(updateEmployeeData.pending , (state)=>{
             state.loading = true
        })
        builder.addCase(updateEmployeeData.fulfilled , (state , action)=>{
             state.loading = false
        })
        builder.addCase(updateEmployeeData.rejected , (state , action)=>{
             state.loading = false
             state.error = action.error.message
        })
    }

})


export default employeeSlice.reducer