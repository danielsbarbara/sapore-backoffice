"use client"
import { ChangeEvent, useState } from "react"
import { addMenu } from "../_server/actions"
import { MenuType, useMenu } from "../hooks/useMenu"
import Image from "next/image"
import { SelectMenuType } from "./SelectMenuType"
import { IoMdAddCircle } from "react-icons/io"
import { useDay } from "./DayContext"
import { ObjectId } from "mongodb"
import { useRouter } from "next/navigation"
import { IoCloseSharp } from "react-icons/io5"
import toast from "react-hot-toast"

interface isOpen {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal: React.FC<isOpen> = ({ isOpen, setIsOpen }) => {
    const [menuType, setMenuType] = useState<string>('pastas')
    const router = useRouter()
    const menu = useMenu(menuType) as MenuType
    const { day } = useDay()
    const notify = () => toast.success('Menu adicionado!')

    const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        setMenuType(() => event.target.value)
    }

    const handleSubmit = async (name: string, id: ObjectId) => {
        const res = await addMenu(name, id, day)
        if (res) {
            notify()
            router.refresh()
        }
    }

    return (
        <>
            <div className={`absolute bg-white 
        overflow-scroll flex flex-col items-center h-[40rem] w-[50rem]
        transform transition duration-500 animate-modalEntry`}>
                <div className="flex justify-center w-full">
                    <div className="flex flex-grow justify-center pt-5">
                        <SelectMenuType menuType={menuType} handleChange={handleChange} />
                    </div>
                    <button
                        onClick={() => { setIsOpen(() => false) }}>
                        <IoCloseSharp size={30} />
                    </button>
                </div>
                <div className="flex flex-wrap justify-center gap-5 pb-5 pt-10">
                    {menu?.pt.food.map(item =>
                        <div className="w-[10rem] border-[1px] border-y-gray-300
                    rounded-lg p-1 flex flex-col justify-between"
                            key={Math.random()}>
                            <div className="flex gap-5">
                                <p className="text-sm">{item.name}</p>
                                <p>{item.price}€</p>
                            </div>
                            <div className="flex justify-between">
                                <Image
                                    className="rounded-lg"
                                    height={50}
                                    width={70}
                                    alt={`${item.imageUrl} image`}
                                    src={item.imageUrl}
                                />
                                <button className="self-end" onClick={() => handleSubmit(item.name, menu._id)}>
                                    <IoMdAddCircle size={20} />
                                </button>
                            </div>
                        </div>)}
                </div>
            </div>
        </>
    )
}