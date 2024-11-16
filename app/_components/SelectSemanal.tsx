"use client"
import { useDay } from "./DayContext"


export const SelectSemanal: React.FC = () => {
    const { day, handleChange } = useDay()
    return (
        <>
            <select
                className="p-2 text-lg font-bold rounded-lg lg:text-2xl"
                value={day}
                onChange={(e) => handleChange(e)}>
                <option value="Segunda-Feira">Segunda-Feira</option>
                <option value="Terça-Feira">Terça-Feira</option>
                <option value="Quarta-Feira">Quarta-Feira</option>
                <option value="Quinta-Feira">Quinta-Feira</option>
                <option value="Sexta-Feira">Sexta-Feira</option>
            </select>
        </>
    )
}