"use client"
import { useSelect } from "./SelectContext"

const typeSelect = {
    menuSelect: [{ descr: 'Entradas', value: 'entries' }, { descr: 'Massas', value: 'pastas' }, { descr: 'Saladas', value: 'salads' }, { descr: 'Pizzas', value: 'pizzas' }, { descr: 'Carnes', value: 'meat' }, { descr: 'Peixes', value: 'fish' }],
    winesSelect: [{ descr: 'Vinhos', value: 'wines' }],
    drinksSelect: [{ descr: 'Bebidas', value: 'drinks' }],
    dessertsSelect: [{ descr: 'Doces', value: 'sweets' }, { descr: 'Gelados', value: 'ice-creams' }]
}

interface DinamicSelectProps {
    type: keyof typeof typeSelect
    selectValue: string
}

export const DinamicSelect: React.FC<DinamicSelectProps> = ({ type, selectValue }) => {
    const {selectType, setSelectType} = useSelect(typeSelect[type][0].value)
    const valueOptions = typeSelect[type]

    return (
        <>
            <select
                defaultValue={valueOptions[0].descr}
                value={selectType}
                onChange={(e) => setSelectType(() => e.target.value)}
                className="p-2 text-lg font-bold rounded-lg">
                {valueOptions.map(el =>
                    <option value={el.value}>
                        {el.descr}
                    </option>)}
            </select>
        </>
    )
}