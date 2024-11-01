import { ObjectId } from "mongodb"
import { FaCheck } from "react-icons/fa"
import { MdEdit } from "react-icons/md"

interface EditCardButProps{
    isEdit: boolean
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    handleSubmit: (oldName?: string, _id?: ObjectId) => Promise<void | string>
    oldName?: string
    _id?: ObjectId
}

export const EditCardBut: React.FC<EditCardButProps> = ({_id, isEdit, setEdit, handleSubmit, oldName}) => {

    return (
        <>
            {!isEdit ? <button onClick={() => setEdit(() => !isEdit)}>
                <MdEdit size={30} />
            </button>
                :
                <button onClick={() => handleSubmit(oldName, _id)}>
                    <FaCheck size={30} />
                </button>}
        </>
    )
}