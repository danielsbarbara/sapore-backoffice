"use client"
import { useEffect } from "react"
import { useSelect } from "./SelectContext"

const typeSelect = {
    menuSelect: [{ descr: 'Entradas', value: 'entries' }, { descr: 'Massas', value: 'pastas' }, { descr: 'Saladas', value: 'salads' }, { descr: 'Pizzas', value: 'pizzas' }, { descr: 'Carnes', value: 'meat' }, { descr: 'Peixes', value: 'fish' }],
    winesSelect: [{ descr: 'Vinhos', value: 'wines' }],
    drinksSelect: [{ descr: 'Bebidas', value: 'drinks' }],
    dessertsSelect: [{ descr: 'Doces', value: 'sweets' }, { descr: 'Gelados', value: 'ice-cream' }]
}

interface DinamicSelectProps {
    type: keyof typeof typeSelect
    selectValue: string
}

export const DinamicSelect: React.FC<DinamicSelectProps> = ({ type, selectValue }) => {
    const { selectType, setSelectType } = useSelect()
    const valueOptions = typeSelect[type]

    useEffect(() => {
        if (!selectType) {
            setSelectType(selectValue);
        }
    }, [selectType, selectValue, setSelectType])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectType(e.target.value)
    }
    return (
        <div className="flex justify-center p-3">
            <select
                // defaultValue={valueOptions[0].value}
                value={selectType}
                onChange={(e) => handleChange(e)}
                className="p-2 text-lg font-bold rounded-lg md:text-[1.7rem]">
                {valueOptions.map(el =>
                    <option value={el.value} key={el.value}>
                        {el.descr}
                    </option>)}
            </select>
        </div>
    )
}