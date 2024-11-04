import Image from "next/image"
import { DeleteButton } from "./DeleteButton"
import { EditButton } from "./EditButton"
import { useRef, useState } from "react"
import { MdCancel } from "react-icons/md"

export interface DayCardProps {
    menu: {
        name: string,
        ingredients: {
            pt: string,
            en: string,
            fr: string
        },
        price: string
        imageUrl: string
    },
    day: string,
    time: number
}

export const DayCard: React.FC<DayCardProps> = ({ menu, day, time }) => {
    const nameRef = useRef<HTMLInputElement | null>(null)
    const priceRef = useRef<HTMLInputElement | null>(null)
    const textRef = useRef<HTMLTextAreaElement | null>(null)
    const [isEdit, setEdit] = useState<boolean>(false)
    const [isUpdating, setUpdating] = useState<boolean>(false)
    const { name, price, imageUrl, ingredients } = menu
    return (
        <div className="flex flex-col justify-between py-2 border-black 
        border-[2px] w-[27rem] h-[14.4rem] rounded-xl transition-all animate-menuFadeIn"
        style={{animationDelay: `${time / 7}s`, animationFillMode: 'backwards'}}>
            <div className="flex justify-between px-3">
                {isEdit ?
                    <>
                        <input
                            disabled={isUpdating}
                            defaultValue={name}
                            className="p-1 w-[20rem] border-[1px] border-black/30 rounded-lg"
                            ref={nameRef} />

                        <input
                            disabled={isUpdating}
                            defaultValue={price}
                            className="p-1 w-[4rem] text-right border-[1px] border-black/30 rounded-lg"
                            ref={priceRef} />
                    </>
                    :
                    <>
                        <p className="max-w-[17rem]">{name}</p>
                        <p>{price}€</p>
                    </>
                }
            </div>
            <div className="flex justify-between px-3">
                <div className="relative h-[10rem] w-[10rem]">
                    <Image
                        fill
                        className="object-cover"
                        src={imageUrl}
                        alt={`${name} image`}
                    />
                </div>
                {isEdit ?
                    <textarea
                        disabled={isUpdating}
                        className="border-[1px] border-black/30 rounded-lg"
                        defaultValue={ingredients.pt}
                        ref={textRef} />
                    :
                    <p className="max-w-[10rem]">{ingredients.pt}</p>
                }
                <div className="flex flex-col self-end gap-2">
                    {isEdit &&
                        <button onClick={() => setEdit(() => false)}>
                            <MdCancel size={30} />
                        </button>}
                    <EditButton
                        setUpdating={setUpdating}
                        nameRef={nameRef}
                        originalName={name}
                        priceRef={priceRef}
                        textRef={textRef}
                        day={day}
                        isEdit={isEdit}
                        setEdit={setEdit} />
                    <DeleteButton menuName={name} day={day} />
                </div>
            </div>
        </div>
    )
}