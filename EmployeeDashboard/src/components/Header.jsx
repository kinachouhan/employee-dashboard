import { IoMdAdd } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { Layout } from "../Wrapper/Layout";
import { useDispatch, useSelector } from "react-redux";
import { openEmployeePopup } from "../store/features/popup.slice";

export const Header = () => {

    
    const dispatch = useDispatch()

    const handleAdd = ()=>{
         dispatch(openEmployeePopup())
    }
    return (
        <div className="bg-base-200 sticky top-0 z-10"> 
            <Layout>
                <div className="navbar shadow-sm ">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">Employee Dashboard</a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1 flex items-center">
                            <li onClick={handleAdd}><a><IoMdAdd className="text-2xl" /></a></li>
                            <li><a><FaHeart className="text-2xl" /></a></li>
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    )
}