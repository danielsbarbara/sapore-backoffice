"use client"

import { createContext, useContext, useState } from "react"

interface DayProviderProps {
    children: React.ReactNode
}

interface DayContext {
    day: string,
    handleChange: (value: React.ChangeEvent<HTMLSelectElement>) => void
}

const DayContext = createContext<DayContext | null>(null)

export const DayProvider: React.FC<DayProviderProps> = ({children}) => {
    const [day, setDay] = useState<string>('Segunda-Feira')

    const handleChange = (value: React.ChangeEvent<HTMLSelectElement>) => {
        setDay(() => value.target.value)
    }
    return (
        <DayContext.Provider value={{day, handleChange}}>
            {children}
        </DayContext.Provider>
    )
}

export const useDay = () =>{
    const context = useContext(DayContext)!
    if(context === undefined) throw new Error('Context used in a wrong place')
    return context
}