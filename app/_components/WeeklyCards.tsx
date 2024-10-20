"use client"
import { ObjectId } from "mongodb"
import { useState } from "react"
import { IoIosAddCircle } from "react-icons/io"
import { DayCard } from "./DayCard"
import { useDay } from "./DayContext"
import { Modal } from "./Modal"

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
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { day } = useDay()
    const [dayCard] = weeklyArray.filter(item => item.day.pt === day)

    return (
        <div className="max-w-[57rem] flex flex-col items-center pt-8">
            <div className="flex justify-center flex-wrap gap-4">
                {dayCard.menu.map((item, i: number) => <DayCard menu={item} day={day} key={i}/>)}
            </div>
            <button onClick={() => setIsOpen(() => !isOpen)}
                className="pt-10 px-2 self-end">
                <IoIosAddCircle size={50} />
            </button>
            {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
    )
}