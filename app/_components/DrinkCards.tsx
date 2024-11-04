import { useRef } from "react"
import { useQuery } from "react-query"
import { fetchDrinksMenu } from "../_server/actions"
import { Drink } from "./Drink"
import { useSelect } from "./SelectContext"

interface DrinkCardsProps {
    drinkQuery: string
}

export const DrinkCards: React.FC<DrinkCardsProps> = ({drinkQuery}) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const { selectType } = useSelect()
    const { data } = useQuery([drinkQuery, selectType], () => fetchDrinksMenu(selectType))

    return (
        <div className="flex flex-wrap gap-7 justify-center">
            {data?.map((el, i: number) =>
                <div key={el.pt.name} className="border-[1px] border-black rounded-lg p-2 
                w-[20rem] flex flex-col gap-3 animate-menuFadeIn"
        style={{animationDelay: `${i / 7}s`, animationFillMode: 'backwards'}}>
                    <p className="text-center text-xl font-bold">{el.pt.name}</p>
                    {el.pt.food.map((item, i: number) =>
                        <Drink
                            drinkQuery={drinkQuery}
                            _id={el._id}
                            item={item}
                            nameRef={nameRef}
                            priceRef={priceRef}
                            key={i}
                             />)}
                </div>
            )}
        </div>
    )
}