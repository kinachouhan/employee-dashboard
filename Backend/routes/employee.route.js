import express from "express"
import { deleteEmployee, employeeDataStore, getAllEmployees, updateEmployee } from "../controllers/employee.controller.js"


const router = express.Router()

router.post("/data" , employeeDataStore)
router.get("/getemployees" , getAllEmployees)
router.delete("/delete/:id" , deleteEmployee)
router.put("/update/:id" , updateEmployee)



export default router