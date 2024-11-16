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
import toast from "react-hot-toast"

export const Modal: React.FC = () => {
    const [menuType, setMenuType] = useState<string>('pastas')
    const router = useRouter()
    const menu = useMenu(menuType) as MenuType
    const { day } = useDay()
    const notify = () => toast.success('Menu adicionado!')

    const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        setMenuType(() => event.target.value)
    }

    const handleSubmit = async (id: ObjectId) => {
        const res = await addMenu(id, day)
        if (res) {
            notify()
            router.refresh()
        }
    }

    console.log(menu)
    return (
        <div className="modal">
            <div className="bg-white overflow-scroll flex flex-col items-center h-[40rem] w-[50rem]
        transition-all duration-500 animate-modalEntry shadow-lg shadow-black/50 rounded-lg">
                <div className="flex justify-center w-full">
                    <div className="flex flex-grow justify-center pt-5">
                        <SelectMenuType menuType={menuType} handleChange={handleChange} />
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-5 pb-5 pt-10">
                    {menu?.menu.map(item =>
                        <div className="w-[10rem] border-[1px] border-y-gray-300
                    rounded-lg p-1 flex flex-col justify-between"
                            key={Math.random()}>
                            <div className="flex gap-5">
                                <p className="text-sm">{item.pt.name}</p>
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
                                <button className="self-end" onClick={() => handleSubmit(item._id)}>
                                    <IoMdAddCircle size={20} />
                                </button>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}