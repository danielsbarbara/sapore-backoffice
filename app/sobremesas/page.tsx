import { DinamicSelect } from "../_components/DinamicSelect"
import { SelectProvider } from "../_components/SelectContext"

const page: React.FC = () => {
    return (
        <div className="bg-red-300 w-full">
            <SelectProvider>
                <DinamicSelect type="dessertsSelect" selectValue="sweets"/>
            </SelectProvider>
        </div>
    )
}

export default page