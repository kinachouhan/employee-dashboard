import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./dbConnection/dbConnect.js"
import employeeRouter from "./routes/employee.route.js"
import cors from "cors"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5100
connectDb()
app.use(express.json());
app.use(cors())


app.use("/api/v1/employee" , employeeRouter)



app.listen(PORT , ()=>{
     console.log(`App is listening on this ${PORT}`)
})


