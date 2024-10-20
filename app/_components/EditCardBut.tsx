import { FaCheck } from "react-icons/fa"
import { MdEdit } from "react-icons/md"

interface EditCardButProps{
    isEdit: boolean
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditCardBut: React.FC<EditCardButProps> = ({isEdit, setEdit}) => {

    return (
        <>
            {!isEdit ? <button onClick={() => setEdit(() => !isEdit)}>
                <MdEdit size={30} />
            </button>
                :
                <button onClick={() => {}}>
                    <FaCheck size={30} />
                </button>}
        </>
    )
}