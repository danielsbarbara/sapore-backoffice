import { MdCancel, MdDelete } from "react-icons/md"
import { EditCardBut } from "./EditCardBut"
import { useState } from "react"
import { ObjectId } from "mongodb"
import { updateDrinkName, updateDrinks } from "../_server/actions"
import { QueryClient, useQueryClient } from "react-query"
import toast from "react-hot-toast"

interface DrinksProps {
    _id: ObjectId
    item: {
        name: string
        price: string
    }
    nameRef: React.RefObject<HTMLInputElement>
    priceRef: React.RefObject<HTMLInputElement>
    drinkQuery: string
}

export const Drink: React.FC<DrinksProps> = ({ _id, item, nameRef, priceRef, drinkQuery }) => {
    const query: QueryClient = useQueryClient()
    const [isEditing, setEditing] = useState<boolean>(false)
    const { name: oldName } = item

    const handleSubmit = async (oldName: string | undefined, id: ObjectId | undefined): Promise<string> => {
        //Actualiza apenas o nome nos Vinhos
        if (nameRef.current?.id && nameRef.current.value && !priceRef.current?.value) {
            const wasUpdated = await updateDrinkName(oldName!, nameRef.current.value, id!)
            if (wasUpdated) {
                query.invalidateQueries([drinkQuery])
                setEditing(() => false)
                return toast.success('Nome actualizado com sucesso')
            }
            setEditing(() => false)
            return toast.error('Ocorreu um erro a actualizar, tente novamente')
        }else{
            const updated = await updateDrinks(oldName!, nameRef.current?.value!, priceRef.current?.value!, id!)
            if(updated){
                query.invalidateQueries([drinkQuery])
                setEditing(() => false)
                return toast.success('Actualizado com sucesso!')
            }
            setEditing(() => false)
            return toast.error('Ocorreu um erro, tenta')
        }
    }

    return (
        <div className="flex justify-between">
            <div>
                {isEditing ?
                    <>
                        {+item.price !== 0 ?
                            <>
                                <input defaultValue={item.name} ref={nameRef} />
                                <input defaultValue={item.price} ref={priceRef} />
                            </>
                            :
                            <input defaultValue={item.name} ref={nameRef} id="name" />}
                    </>
                    :
                    <>
                        <p className={`${+item.price === 0 && 'font-bold'}`}>{item.name}</p>
                        <p>{+item.price !== 0 && `${item.price}€`}</p>
                    </>
                }
            </div>
            <div className="flex flex-col self-end">
                {isEditing && <button>
                    <MdCancel size={30} onClick={() => setEditing(() => false)} />
                </button>}
                <EditCardBut
                    _id={_id}
                    oldName={oldName}
                    handleSubmit={handleSubmit}
                    isEdit={isEditing}
                    setEdit={setEditing} />
                <button>
                    <MdDelete size={30} />
                </button>
            </div>
        </div>

    )
}