import { useQuery } from "react-query"
import { useSelect } from "./SelectContext"
import { fetchDrinksMenu } from "../_server/actions"
import { useRef, useState } from "react"
import { MdCancel, MdDelete } from "react-icons/md"
import { EditCardBut } from "./EditCardBut"

export const DrinkCards: React.FC = () => {
    const [isEditing, setEditing] = useState<boolean>(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const { selectType } = useSelect()
    const { data } = useQuery(['wines', selectType], () => fetchDrinksMenu(selectType))

    return (
        <div className="flex flex-wrap gap-7 justify-center">
            {data?.map(el =>
                <div key={el.pt.name} className="border-[1px] border-black rounded-lg p-2 w-[20rem] flex flex-col gap-3">
                    <p className="text-center text-xl font-bold">{el.pt.name}</p>
                    {el.pt.food.map((item, i: number) =>
                        <div key={i} className="flex justify-between">
                            {isEditing ?
                                <>
                                    <input defaultValue={item.name} className="rounded-md p-1" ref={nameRef} />
                                    {+item.price !== 0 &&
                                        <input defaultValue={item.price} className="w-[4rem] text-right rounded-md p-1" ref={priceRef} />}
                                </>
                                :
                                <>
                                    <p className={`${+item.price === 0 && 'font-bold'}`}>{item.name}</p>
                                    <p>{+item.price !== 0 && `${item.price}€`}</p>
                                </>
                            }
                        </div>
                    )}
                    <div className="flex self-end mt-3">
                        {isEditing && <button>
                            <MdCancel size={30} onClick={() => setEditing(() => false)} />
                        </button>}
                        <EditCardBut isEdit={isEditing} setEdit={setEditing} />
                        <button>
                            <MdDelete size={30} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}