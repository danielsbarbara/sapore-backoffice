"use client"
import { useQuery, useQueryClient } from "react-query"
import { useSelect } from "./SelectContext"
import { fetchMenuByType } from "../_server/actions"
import { ObjectId } from "mongodb"
import Image from "next/image"
import { MdDelete, MdEdit } from "react-icons/md"
import { useState } from "react"
import { EditCardBut } from "./EditCardBut"
import { Card } from "./Card"

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
                <Card menu={el} key={el.name}/>
            ))
            }
        </div>
    )
}