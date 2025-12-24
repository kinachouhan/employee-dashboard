import {configureStore} from "@reduxjs/toolkit"
import popupReducer from "./features/popup.slice"
import employeeReducer from "./features/employee.slice"

const store = configureStore({
    reducer:{
        popup: popupReducer,
        employee : employeeReducer
    }
})


export default store