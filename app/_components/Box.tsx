"use client"
import { ObjectId } from "mongodb"
import { useQuery } from "react-query"
import { fetchMenuByType } from "../_server/actions"
import { Card } from "./Card"
import { useSelect } from "./SelectContext"

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
    const { data } = useQuery([menuType, selectType], () => fetchMenuByType(selectType))
    return (
        <div className="flex flex-wrap justify-center gap-4 p-3">
            {data?.map((_el) => _el.pt.food.map(el =>
                <Card menuType={menuType} menu={el} menuName={_el.pt.name} key={el.name}/>
            ))
            }
        </div>
    )
}