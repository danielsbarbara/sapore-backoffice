import Image from "next/image"
import { EditCardBut } from "./EditCardBut"
import { MdCancel, MdDelete } from "react-icons/md"
import { useState } from "react"

interface CardProps {
    menu: {
        name: string
        price: string
        imageUrl: string
        description: string
    }
}

export const Card: React.FC<CardProps> = ({ menu }) => {
    const [isEdit, setEdit] = useState<boolean>(false)
    const { name, price, imageUrl, description } = menu
    return (
        <div
            className="flex flex-col justify-between py-2 border-black 
                    border-[2px] w-[20rem] h-[14.4rem] rounded-xl p-1">
            <div className="flex justify-between px-2">
                {isEdit ?
                    <>
                        <input value={name} className="p-1 w-[13rem] border-[1px] border-black/30 rounded-lg"/>
                        <input value={price} className="p-1 w-[4rem] text-right border-[1px] border-black/30 rounded-lg" />
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
                {isEdit && description ? <textarea value={description} className="border-[1px] border-black/30 rounded-lg"/>
                : <p className="max-w-[7rem] text-sm">{description}</p>}
                <div className="flex flex-col self-end">
                    {isEdit && <button onClick={() => setEdit(() => false)}>
                        <MdCancel size={30}/>
                    </button>}
                    <EditCardBut isEdit={isEdit} setEdit={setEdit} />
                    <button>
                        <MdDelete size={30} />
                    </button>
                </div>
            </div>
        </div>
    )
}