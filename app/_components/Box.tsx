"use client"
import { ObjectId } from "mongodb"
import { useQuery, UseQueryResult } from "react-query"
import { fetchMenuByType } from "../_server/actions"
import { Card } from "./Card"
import { useSelect } from "./SelectContext"
import { MenuSchema, MenuType, TipsOfDayType } from "../_util/types"

export interface dataType {
    _id: ObjectId,
    menuType: string,
    pt: {
        name: string,
        food: {
            name: string,
            price: string,
            description: string,
            imageUrl: string
        }[]
    }
}

interface CardProps {
    menuType: string
}

export const Box: React.FC<CardProps> = ({menuType}) => {
    const { selectType } = useSelect()
    const { data } = useQuery([menuType, selectType], () => fetchMenuByType(selectType)) as UseQueryResult<MenuType[]>
    return (
        <div className="flex flex-wrap justify-center gap-4 p-3">
            {(() => { 
                let globalIndex:number = 0
                return data?.map((_el) => { 
                return _el.menu.map((el) => {
                globalIndex++
               return <Card timeToFadeIn={globalIndex} menuType={menuType} menu={el} menuName={el.pt.name} key={globalIndex}/>
            }
            )})
            })()}
        </div>
    )
}