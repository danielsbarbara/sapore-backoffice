"use client"
import { ObjectId } from "mongodb"
import { useDay } from "./DayContext"
import { DayCard } from "./DayCard"
import { MdDelete } from "react-icons/md"
import { IoIosAddCircle } from "react-icons/io"

export interface CardType {
    _id: ObjectId,
    day: {
        pt: string
        en: string
        fr: string
    }
    menu: [{
        name: string,
        ingredients: {
            pt: string,
            en: string,
            fr: string
        },
        price: string
        imageUrl: string
    }]
}

export interface CardTypeProps {
    weeklyArray: CardType[]
}

export const WeeklyCards: React.FC<CardTypeProps> = ({ weeklyArray }) => {
    const { day } = useDay()
    const [dayCard] = weeklyArray.filter(item => item.day.pt === day)
    return (
        <div className="max-w-[57rem] flex flex-col items-center">
            <p className="text-xl">{dayCard.day.pt}</p>
            <div className="flex justify-center flex-wrap gap-4">
                {dayCard.menu.map(item => <DayCard menu={item} />)}
            </div>
            <button className="pt-10 px-2 self-end">
                <IoIosAddCircle size={50} />
            </button>
        </div>
    )
}