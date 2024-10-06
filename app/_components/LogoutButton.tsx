import { IoMdLogOut } from "react-icons/io"

export const LogoutButton: React.FC = () => {
    return (
        <button className="text-center pb-4 transform transition duration-500 
        hover:scale-110">
            <IoMdLogOut size={50}/>
        </button>
    )
}