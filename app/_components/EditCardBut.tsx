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
            {!isEdit ? <button className="transition-all hover:scale-110 active:scale-90" onClick={() => setEdit(() => !isEdit)}>
                <MdEdit size={20} />
            </button>
                :
                <button className="transition-all hover:scale-110 active:scale-90" onClick={() => handleSubmit(oldName, _id)}>
                    <FaCheck size={20}/>
                </button>}
        </>
    )
}