import { useDispatch, useSelector } from "react-redux"
import { closeEmployeePopup } from "../store/features/popup.slice"
import { useState } from "react"
import { postEmployeeData, updateEmployeeData } from "../store/features/employee.slice"
import { useEffect } from "react"
import toast from "react-hot-toast"

export const EmployeePopup = () => {

    const dispatch = useDispatch()
    const popup = useSelector(state => state.popup.employeePopup)



    const [formDetails, setFormDetails] = useState({
        name: "",
        profileURL: "",
        bio: "",
        email: "",
        highlight: false
    })


    const handleInput = (e) => {
        const { name, value } = e.target

        setFormDetails({
            ...formDetails,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        const { name, profileURL, email, bio } = formDetails;
        if (!name || !profileURL || !email || !bio) {
            return toast.error("All fields are required");
        }

        try {
            if (popup._id) {
                await dispatch(
                    updateEmployeeData({
                        id: popup._id,
                        data: formDetails
                    })
                ).unwrap();

                toast.success("Employee data updated!");
            } else {
                await dispatch(postEmployeeData(formDetails)).unwrap();
                toast.success("New employee created!");
                dispatch(closeEmployeePopup())
            }

        } catch (error) {
            toast.error(error || "Something went wrong");
        }
    };


    useEffect(() => {
        if (!popup) {
            setFormDetails({
                name: "",
                profileURL: "",
                bio: "",
                email: "",
                highlight: false
            })
        }
        else if (popup._id) {
            setFormDetails({
                name: popup.name,
                profileURL: popup.profileURL,
                bio: popup.bio,
                email: popup.email,
                highlight: false
            })
        }
    }, [popup])

    if (!popup) return null

    return (
        <div onClick={() => dispatch(closeEmployeePopup())} className="flex justify-center items-center h-full w-full top-0 left-0 fixed bg-black/80 z-20">
            <fieldset onClick={(e) => e.stopPropagation()} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Employee Details</legend>

                <label className="label">Profile URL</label>
                <input value={formDetails.profileURL} type="text" className="input" placeholder="Profile URL" name="profileURL" onChange={handleInput} />

                <label className="label">Name</label>
                <input value={formDetails.name} type="text" className="input" placeholder="Name" name="name" onChange={handleInput} />

                <label className="label">Email</label>
                <input value={formDetails.email} type="email" className="input" placeholder="Email" name="email" onChange={handleInput} />

                <legend className="label">Bio</legend>
                <textarea value={formDetails.bio} className="textarea h-24" placeholder="Bio" name="bio" onChange={handleInput}></textarea>

                <button onClick={handleSubmit} className="btn btn-neutral mt-4">Submit</button>
            </fieldset>
        </div>
    )
}