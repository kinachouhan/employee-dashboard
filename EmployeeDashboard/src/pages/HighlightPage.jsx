import { useSelector } from "react-redux"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { EmployeeCard } from "../EmployeesList/Employee"

export const HighlightPage = () => {

    const employees = useSelector(state => state.employee.employees)

    const highlightedEmployees = employees.filter(
        emp => emp.highlight === true
    )

    return (
        <div className="flex h-screen flex-col">
            <Header />

            <div className="flex-1">
                {
                   employees.length == 0 && <p>No Highlight Employees!!</p>
                }
                {employees
                    .filter(emp => emp.highlight === true)
                    .map(emp => (
                        <div key={emp._id} className="list bg-base-100 rounded-box shadow-md gap-8">

                            <EmployeeCard key={emp._id} details={emp} />
                        </div>
                    ))
                }
            </div>

            <Footer />
        </div>
    )
}