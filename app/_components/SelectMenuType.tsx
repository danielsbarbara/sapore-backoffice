import { ChangeEvent } from "react"

interface SelectMenuTypeProps {
    menuType: string
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectMenuType: React.FC<SelectMenuTypeProps> = 
({menuType, handleChange}) => {

    return (
        <select defaultValue={menuType} onChange={(e) => handleChange(e)}
        className="border-[2px] border-black rounded-lg h-[2rem] 
        outline-none mt-2 text-lg">
                <option value="pastas">Massas</option>
                <option value="pizzas">Pizzas</option>
                <option value="salads">Saladas</option>
                <option value="meat">Carnes</option>
                <option value="fish">Peixe</option>
            </select>
    )
}