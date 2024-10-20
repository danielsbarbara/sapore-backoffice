"use client"
import { MdDelete } from "react-icons/md"
import { deleteMenu } from "../_server/actions"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface DeleteButton {
    menuName: string
    day: string
}

export const DeleteButton: React.FC<DeleteButton> = ({ menuName, day }) => {
    const router = useRouter()
    const notify = () => toast.success('Menu eliminado com sucesso!')
    
    const handleDelete = async () => {
        const isDeleted = await deleteMenu(menuName, day) as boolean
        if (isDeleted) {
            notify()
            return router.refresh()
        }
    }
    return (
        <button onClick={() => handleDelete()}>
            <MdDelete size={30} />
        </button>
    )
}