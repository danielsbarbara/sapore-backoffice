import { MdDelete } from "react-icons/md"

interface DeleteButton {
    menuName: string
}

export const DeleteButton: React.FC<DeleteButton> = ({menuName}) => {
    const handleDelete = (menuName: string) => {
        console.log(menuName)
    }

    return (
        <button onClick={() => handleDelete(menuName)}>
            <MdDelete size={30} />
        </button>
    )
}