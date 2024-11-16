import { Toaster } from "react-hot-toast"
import { DayProvider } from "../_components/DayContext"
import { SelectSemanal } from "../_components/SelectSemanal"
import { CardType, WeeklyCards } from "../_components/WeeklyCards"
import { getTipDay } from "../_server/CRUD"
import { TipsOfDayType } from "../_util/types"

const page: React.FC = async () => {
    const weeklyMenu = await getTipDay() as TipsOfDayType[]
    return (
        <div className="grid-menu-template">
            <h1 className="text-2xl font-bold p-3 lg:text-[2rem]">Menu Semanal</h1>
            <DayProvider>
                <SelectSemanal />
                <WeeklyCards weeklyArray={JSON.parse(JSON.stringify(weeklyMenu))} />
                <Toaster position="top-center" />
            </DayProvider>
        </div>
    )
}

export default page