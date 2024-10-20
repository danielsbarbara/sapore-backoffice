"use client"
import { createContext, useContext, useState } from "react"

interface SelectProviderProps {
    children: React.ReactNode
}

interface SelectContextType {
    selectType: string
    setSelectType: React.Dispatch<React.SetStateAction<string>>
}

const SelectContext = createContext<SelectContextType | null>(null)

export const SelectProvider: React.FC<SelectProviderProps> = ({ children }) => {
    const [selectType, setSelectType] = useState<string>('')

    return (
        <SelectContext.Provider value={{ selectType, setSelectType }}>
            {children}
        </SelectContext.Provider>
    )
}

export const useSelect = (type?: string) => {
    const context = useContext(SelectContext)
    if (!context) throw new Error('Deves usar o context correctamente')

    const { selectType, setSelectType } = context
    if (selectType === '' && type) setSelectType(() => type)

    return context
}