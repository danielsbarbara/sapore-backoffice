import { IoMdLogOut } from "react-icons/io"

export const LogoutButton: React.FC = () => {
    return (
        <button className="col-start-3 text-center pb-4 transform transition duration-500 
        hover:scale-110">
            <IoMdLogOut size={30}/>
        </button>
    )
}