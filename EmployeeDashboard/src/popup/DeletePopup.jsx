import { useDispatch, useSelector } from "react-redux"
import { closeDeletePopup } from "../store/features/popup.slice"
import { deleteEmployeeData } from "../store/features/employee.slice"
import toast from "react-hot-toast"

export const DeletePopup = () => {

    const dispatch = useDispatch()

    const popup = useSelector(state=> state.popup.deletePopup)

    const handledeletebtn = async()=>{
        console.log(popup)
         await dispatch(deleteEmployeeData(popup))
         dispatch(closeDeletePopup())
         toast.success("Employee data deleted!")
    }

    if(!popup) return null


    return (
        <div onClick={()=> dispatch(closeDeletePopup())} className="flex justify-center items-center w-full h-full fixed top-0 left-0 z-20 bg-black/80">
            <div onClick={(e)=> e.stopPropagation()} className="card w-96 bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Delete</h2>
                    <p>Are you sure, you want to delete this?</p>
                    <div className="justify-end card-actions">
                        <button onClick={()=>dispatch(closeDeletePopup())} className="btn btn-primary px-8">No</button>
                        <button onClick={handledeletebtn} className="btn btn-primary px-8">yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}