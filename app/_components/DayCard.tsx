import Image from "next/image"
import { DeleteButton } from "./DeleteButton"
import { EditButton } from "./EditButton"
import { useRef, useState } from "react"
import { MdCancel } from "react-icons/md"
import { MenuSchema } from "../_util/types"

interface DayCardProps {
    menu: MenuSchema
    day: string 
    time: number
}
export const DayCard: React.FC<DayCardProps> = ({ menu, day, time }) => {
    const nameRef = useRef<HTMLInputElement | null>(null)
    const priceRef = useRef<HTMLInputElement | null>(null)
    const textRef = useRef<HTMLTextAreaElement | null>(null)
    const [isEdit, setEdit] = useState<boolean>(false)
    const [isUpdating, setUpdating] = useState<boolean>(false)

    const { pt: {name}, price, imageUrl, pt:{description} } = menu
    return (
        <div className="flex flex-col justify-around py-2 border-black 
        border-[2px] w-[17rem] h-[14.4rem] md:w-[25rem] md:h-[20rem] lg:w-[35rem] 
        rounded-xl transition-all animate-menuFadeIn md:text-lg lg:text-2xl"
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
                <div className="relative h-[5rem] w-[5rem] md:h-[12rem] md:w-[10rem] 
                rounded-lg overflow-hidden">
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
                        defaultValue={description}
                        ref={textRef} />
                    :
                    <p className="max-w-[13rem] ml-1">{description}</p>
                }
                <div className="flex flex-col self-end gap-2">
                    {isEdit &&
                        <button onClick={() => setEdit(() => false)}>
                            <MdCancel size={30} />
                        </button>}
                    <EditButton
                        setUpdating={setUpdating}
                        nameRef={nameRef}
                        // originalName={name}
                        _id={menu._id}
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