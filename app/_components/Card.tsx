import Image from "next/image"
import { EditCardBut } from "./EditCardBut"
import { MdCancel, MdDelete } from "react-icons/md"
import { useRef, useState } from "react"
import { updateAllMenu } from "../_server/actions"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { QueryClient, useQueryClient } from "react-query"

interface CardProps {
    menu: {
        name: string
        price: string
        imageUrl: string
        description: string
    }
    menuName: string
    menuType: string
}

export const Card: React.FC<CardProps> = ({ menu, menuName, menuType }) => {
    const query: QueryClient = useQueryClient()
    const [isEdit, setEdit] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)

    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)

    const sucessMsg = (msg: string): string => toast.success(msg)
    const errMsg = (msg: string): string => toast.error(msg)

    const { name, price, imageUrl, description } = menu

    const handleSubmit = async (): Promise<void | string> => {
        if (!nameRef.current?.value || !priceRef.current?.value) return errMsg('Não é premitido campos vazios')

        setDisabled(() => true)
        const values = { nameRef, priceRef, descRef, menuName, oldName: name }
        const submit: boolean = await updateAllMenu(values)
        if (!submit) {
            errMsg('Ocorreu um erro, tenta mais tade')
            setDisabled(() => false)
        } else {
            sucessMsg('Actualizado com sucesso!')
            setDisabled(() => false)
            setEdit(() => !isEdit)
            query.invalidateQueries([menuType])
        }
    }

    return (
        <div
            className="flex flex-col justify-between py-2 border-black 
                    border-[2px] w-[20rem] h-[14.4rem] rounded-xl p-1">
            <div className="flex justify-between px-2">
                {isEdit ?
                    <>
                        <input
                            disabled={disabled}
                            ref={nameRef}
                            defaultValue={name}
                            className="p-1 w-[13rem] border-[1px] border-black/30 rounded-lg" />

                        <input
                            disabled={disabled}
                            ref={priceRef}
                            defaultValue={price}
                            className="p-1 w-[4rem] text-right border-[1px] border-black/30 rounded-lg" />
                    </>
                    :
                    <>
                        <p>{name}</p>
                        <p>{price}€</p>
                    </>
                }
            </div>
            <div className="flex justify-between">
                <div className="relative h-[10rem] w-[10rem] rounded-lg">
                    {imageUrl &&
                        <Image
                            className="object-cover rounded-lg"
                            fill
                            src={imageUrl}
                            alt={`${imageUrl} imagem`}
                        />}
                </div>
                {isEdit && description ?
                    <textarea
                        disabled={disabled}
                        ref={descRef}
                        defaultValue={description}
                        className="border-[1px] border-black/30 rounded-lg" />
                    :
                    <p className="max-w-[7rem] text-sm">{description}</p>}
                <div className="flex flex-col self-end">
                    {isEdit && <button onClick={() => setEdit(() => false)}>
                        <MdCancel size={30} />
                    </button>}
                    <EditCardBut
                        handleSubmit={handleSubmit}
                        isEdit={isEdit}
                        setEdit={setEdit} />
                    <button>
                        <MdDelete size={30} />
                    </button>
                </div>
            </div>
        </div>
    )
}