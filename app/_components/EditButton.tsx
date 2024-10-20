import { FaCheck } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { updateMenu } from "../_server/actions"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface EditButtonProps {
    isEdit: boolean
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    nameRef: React.MutableRefObject<HTMLInputElement | null>
    priceRef: React.MutableRefObject<HTMLInputElement | null>
    textRef: React.MutableRefObject<HTMLTextAreaElement | null>
    day: string
    originalName: string
    setUpdating: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditButton: React.FC<EditButtonProps> = ({ setUpdating, isEdit, setEdit, nameRef, priceRef, textRef, day, originalName }) => {
    const router = useRouter()
    const notify = (message: string) => toast.success(message) 
    const notifyE = (message: string) => toast.error(message)

    const handleSubmit = async() => {
        setUpdating(() => true)
        const name = nameRef.current?.value
        const price = priceRef.current?.value
        const text = textRef.current?.value

        if(!name || !price || !text) return

        const update = await updateMenu(name, price, text, day, originalName)

        if(update) {
            notify('Menu Actualizado!')
            setEdit(() => !isEdit)
            router.refresh()
        } else {
            notifyE('Ocorreu um erro')
        }
        setUpdating(() => false)
    }
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