import { useEffect } from 'react'
import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Employees } from './EmployeesList/Employee'
import { DeletePopup } from './popup/DeletePopup'
import { EmployeePopup } from './popup/EmployeePopup'
import { useDispatch } from 'react-redux'
import { getEmployeeData } from './store/features/employee.slice'
import { Toaster } from 'react-hot-toast';



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEmployeeData())
  }, [])


  return (
    <>

      <Toaster position='top-right' />


      <div className='flex flex-col h-screen'>
        <EmployeePopup />
        <DeletePopup />
        <Header />
        <div className='flex-1 py-4'>
          <Employees />
        </div>
        <Footer />
      </div>
    </>


  )
}

export default App
