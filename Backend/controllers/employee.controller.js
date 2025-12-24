import { Employee } from "../models/employeeData.model.js";

export const employeeDataStore = async (req, res, next) => {
    try {
        const { name, profileURL, email, bio, highlight } = req.body

        if (!name || !profileURL || !email || !bio) {
            return res.status(400).json("All fields are required")
        }

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(409).json({
                success: false,
                message: "Employee with this email already exists"
            });
        }

        const newEmployee = await Employee.create({
            name,
            email,
            profileURL,
            bio,
            highlight
        })

        res.status(201).json({
            success: true,
            responseData: {
                newEmployee
            }
        })
    } catch (error) {
        console.log("Employee store error", error)
        res.status(500).json({
            success: false,
            message: "something went wrong , please try again"
        })
    }
}


export const getAllEmployees = async(req, res) => {

    try {
        const employees = await Employee.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            total: employees.length,
            responseData: employees
        });

    } catch (error) {
        console.error("Get All Employees Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch employees"
        });
    }
}


export const deleteEmployee = async(req , res )=>{

    const id = req.params.id

   const deletedEmployee = await Employee.findByIdAndDelete(id)

   return res.status(200).json({
      success: true,
      message: "Employee detail deleted."
   })

}


export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required"
      });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      req.body,                 
      {
        new: true,              
        runValidators: true     
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedEmployee
    });

  } catch (error) {
    console.error("Update Employee Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update employee"
    });
  }
};