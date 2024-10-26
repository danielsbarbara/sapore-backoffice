import { FaCheck } from "react-icons/fa"
import { MdEdit } from "react-icons/md"

interface EditCardButProps{
    isEdit: boolean
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    handleSubmit: () => Promise<void | string>
}

export const EditCardBut: React.FC<EditCardButProps> = ({isEdit, setEdit, handleSubmit}) => {

    return (
        <>
            {!isEdit ? <button onClick={() => setEdit(() => !isEdit)}>
                <MdEdit size={30} />
            </button>
                :
                <button onClick={() => handleSubmit()}>
                    <FaCheck size={30} />
                </button>}
        </>
    )
}