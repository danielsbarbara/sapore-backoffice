import { Toaster } from "react-hot-toast"
import { DayProvider } from "../_components/DayContext"
import { SelectSemanal } from "../_components/SelectSemanal"
import { CardType, WeeklyCards } from "../_components/WeeklyCards"
import { getTipDay } from "../_server/CRUD"

const page: React.FC = async () => {
    const weeklyMenu = await getTipDay() as CardType[]
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold p-3">Menu Semanal</h1>
            <DayProvider>
                <SelectSemanal />
                <WeeklyCards weeklyArray={JSON.parse(JSON.stringify(weeklyMenu))} />
                <Toaster position="top-center" />
            </DayProvider>
        </div>
    )
}

export default page