import { Cards } from "../_components/Cards"
import { DinamicSelect } from "../_components/DinamicSelect"
import { SelectProvider } from "../_components/SelectContext"

const page: React.FC = () => {
    return (
        <div className="bg-red-300 w-full">
            <SelectProvider>
                <DinamicSelect type="menuSelect" selectValue="entries"/>
                <Cards />
            </SelectProvider>
        </div>
    )
}

export default page