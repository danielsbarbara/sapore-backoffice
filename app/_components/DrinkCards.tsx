import { useRef } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { fetchDrinksMenu } from "../_server/actions"
import { Drink } from "./Drink"
import { useSelect } from "./SelectContext"
import { FromBackEndDrinkType } from "../_util/types"

interface DrinkCardsProps {
    drinkQuery: string
}

export const DrinkCards: React.FC<DrinkCardsProps> = ({ drinkQuery }) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const { selectType } = useSelect()
    const { data } = useQuery([drinkQuery, selectType], () => fetchDrinksMenu(selectType)) as UseQueryResult<FromBackEndDrinkType[]>
    return (
        <div className="flex flex-wrap gap-7 justify-center">
            {data?.map((el, i: number) =>
                <div key={i} className="border-[1px] border-black rounded-lg p-2 
                w-[20rem] flex flex-col gap-3 animate-menuFadeIn"
                    style={{ animationDelay: `${i / 7}s`, animationFillMode: 'backwards' }}>
                    <p className="text-center text-xl font-bold">{el.menuName}</p>
                    {el.menu.map((_el) =>
                        <Drink
                            drinkQuery={drinkQuery}
                            _id={_el._id}
                            item={_el}
                            nameRef={nameRef}
                            priceRef={priceRef}
                            key={String(_el._id)}
                        />)}
                </div>
            )}
        </div>
    )
}