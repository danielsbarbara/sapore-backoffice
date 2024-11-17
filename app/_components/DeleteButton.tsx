"use client"
import { MdDelete } from "react-icons/md"
import { deleteMenu } from "../_server/actions"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ObjectId } from "mongodb"

interface DeleteButton {
    id: ObjectId
    day: string
}

export const DeleteButton: React.FC<DeleteButton> = ({ id, day }) => {
    const router = useRouter()
    const notify = () => toast.success('Menu eliminado com sucesso!')
    
    const handleDelete = async () => {
        const isDeleted = await deleteMenu(id, day) as boolean
        if (isDeleted) {
            notify()
            return router.refresh()
        }
    }
    return (
        <button className="hover:scale-110 active:scale-95" onClick={() => handleDelete()}>
            <MdDelete size={30}/>
        </button>
    )
}