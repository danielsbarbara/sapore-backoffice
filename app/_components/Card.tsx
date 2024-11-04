import Image from "next/image"
import { ChangeEvent, useRef, useState } from "react"
import toast from "react-hot-toast"
import { MdCancel, MdDelete } from "react-icons/md"
import { QueryClient, useQueryClient } from "react-query"
import { deleteImage, DeleteImgReturn, updateAllMenu } from "../_server/actions"
import { EditCardBut } from "./EditCardBut"

interface CardProps {
    menu: {
        name: string
        price: string
        imageUrl: string
        description: string
    }
    menuName: string
    menuType: string
    timeToFadeIn: number
}

export const Card: React.FC<CardProps> = ({ menu, menuName, menuType, timeToFadeIn }) => {
    const query: QueryClient = useQueryClient()
    const [isEdit, setEdit] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null)

    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)

    const sucessMsg = (msg: string): string => toast.success(msg)
    const errMsg = (msg: string): string => toast.error(msg)

    const { name, price, imageUrl, description } = menu

    const handleSubmit = async (): Promise<void | string> => {
        if (!nameRef.current?.value || !priceRef.current?.value) return errMsg('Não é premitido campos vazios')
        setDisabled(() => true)

        const values = { nameRef, priceRef, descRef, menuName, oldName: name, file }

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

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        ev.target.files?.length && setFile(() => ev.target.files![0])
    }

    const handleDeleteImage = async () => {
        const values = {
            name,
            menuName,
            imageUrl
        }
        const deletedUrl: DeleteImgReturn = await deleteImage(values)
        if (deletedUrl.type === 'S') {
            sucessMsg(deletedUrl.message)
        } else {
            errMsg(deletedUrl.message)
        }
        query.invalidateQueries([menuType])

        setEdit(() => false)
    }
    return (
        <div
            className={`flex flex-col justify-between py-2 border-black 
                    border-[2px] w-[20rem] h-[14.4rem] rounded-xl p-1 transition-all
                    animate-menuFadeIn`}
            style={{ animationDelay: `${timeToFadeIn / 7}s`, animationFillMode: 'backwards' }}>
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
                    {imageUrl && !isEdit ?
                        <Image
                            className="object-cover rounded-lg"
                            fill
                            src={imageUrl}
                            alt={`${imageUrl} imagem`}
                        /> : isEdit &&
                        <div className="w-8">
                            <label
                                htmlFor="image"
                                className={`bg-gray-400 rounded-md inline-block p-1 transition-all
                                duration-200 ${!!!file && 'hover:cursor-pointer hover:shadow-xl hover:-translate-y-[3px] active:shadow-md active:-translate-y-[1px]'} mb-1`}>
                                {file !== null ? 'Imagem pronta p/ envio' : 'Carregar imagem'}
                            </label>
                            <input disabled={!!file} className="hidden" type="file" onChange={handleChange} id="image" />
                            {imageUrl &&
                                <button className="bg-red-800 rounded-md p-1 
                             text-white mt-1 transition-all duration-200 hover:-translate-y-[2px] 
                             hover:shadow-lg active:-tranlate-y-[1px] active:shadow-md"
                                    onClick={() => handleDeleteImage()}>
                                    Eliminar Imagem
                                </button>}
                        </div>
                    }
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
                    <button className="hover:scale-110 active:scale-95">
                        <MdDelete size={30}/>
                    </button>
                </div>
            </div>
        </div>
    )
}