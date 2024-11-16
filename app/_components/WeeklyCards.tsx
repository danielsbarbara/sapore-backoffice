"use client"
import { ObjectId } from "mongodb"
import { useState } from "react"
import { IoIosAddCircle } from "react-icons/io"
import { DayCard } from "./DayCard"
import { useDay } from "./DayContext"
import { Modal } from "./Modal"
import { MenuType } from "../hooks/useMenu"
import { TipsOfDayType } from "../_util/types"

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
    weeklyArray: TipsOfDayType[]
}

export const WeeklyCards: React.FC<CardTypeProps> = ({ weeklyArray }) => {
    const { day } = useDay()
    const dayCard = weeklyArray.map(item => item.day.pt === day ? item.menu : '').filter(el => el !== '')
    return (
        <>
            <div className="flex flex-col items-center pt-8">
                <input type="checkbox" className="checkbox hidden" id="check" />
                <Modal />
                <label htmlFor="check" className="checkbox1 self-end"><IoIosAddCircle size={50} /></label>
                <div className="flex justify-center flex-wrap gap-4">
                    {dayCard.map((item) => item.map((_item, i: number) => <DayCard menu={_item} day={day} key={Math.random()} time={i} />))}
                </div>
            </div>
        </>
    )
}