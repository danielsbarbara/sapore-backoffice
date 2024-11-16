import { MdCancel, MdDelete } from "react-icons/md"
import { EditCardBut } from "./EditCardBut"
import { useState } from "react"
import { ObjectId } from "mongodb"
import { updateDrinkName, updateDrinks } from "../_server/actions"
import { QueryClient, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { DrinkType } from "../_util/types"

interface DrinksProps {
    _id: ObjectId
    item: DrinkType
    nameRef: React.RefObject<HTMLInputElement>
    priceRef: React.RefObject<HTMLInputElement>
    drinkQuery: string
}

export const Drink: React.FC<DrinksProps> = ({ _id, item, nameRef, priceRef, drinkQuery }) => {
    const query: QueryClient = useQueryClient()
    const [isEditing, setEditing] = useState<boolean>(false)
    const { pt: { name: oldName } } = item

    const handleSubmit = async (oldName: string | undefined, id: ObjectId | undefined): Promise<string> => {
        //Actualiza apenas o nome nos Vinhos
        console.log(drinkQuery)
        if (nameRef.current?.id && nameRef.current.value && !priceRef.current?.value) {
            const wasUpdated = await updateDrinkName(nameRef.current.value, _id)
            if (wasUpdated) {
                query.invalidateQueries([drinkQuery])
                setEditing(() => false)
                return toast.success('Nome actualizado com sucesso')
            }
            setEditing(() => false)
            return toast.error('Ocorreu um erro a actualizar, tente novamente')
        } else {
            const updated = await updateDrinks(nameRef.current?.value!, priceRef.current?.value!, _id)
            if (updated) {
                query.invalidateQueries([drinkQuery])
                setEditing(() => false)
                return toast.success('Actualizado com sucesso!')
            }
            setEditing(() => false)
            return toast.error('Ocorreu um erro, tenta')
        }
    }

    return (
        <div className="flex justify-between items-center">
            <div>
                {isEditing ?
                    <>
                        {+item.price !== 0 ?
                            <>
                                <input defaultValue={item.pt.name} ref={nameRef} />
                                <input defaultValue={item.price} ref={priceRef} />
                            </>
                            :
                            <input defaultValue={item.pt.name} ref={nameRef} id="name" />}
                    </>
                    :
                    <>
                        <p className={`${+item.price === 0 && 'font-bold'}`}>{item.pt.name}</p>
                        <p>{+item.price !== 0 && `${item.price}€`}</p>
                    </>
                }
            </div>
            <div className="flex flex-col self-end">
                {isEditing && <button>
                    <MdCancel size={20} onClick={() => setEditing(() => false)} />
                </button>}
                <EditCardBut
                    _id={_id}
                    oldName={oldName}
                    handleSubmit={handleSubmit}
                    isEdit={isEditing}
                    setEdit={setEditing} />
                <button>
                    <MdDelete size={20} />
                </button>
            </div>
        </div>

    )
}