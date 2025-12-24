import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profileURL : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required : true
    },
    bio : {
        type: String,
        required: true
    },
    highlight: {
        type: Boolean
    }
} , {timestamps: true})


export const Employee = mongoose.model("Employee" , employeeSchema)