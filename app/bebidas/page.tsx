"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import { SelectProvider } from "../_components/SelectContext"
import { DinamicSelect } from "../_components/DinamicSelect"
import { DrinkCards } from "../_components/DrinkCards"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()
const page: React.FC = () => {
    return (
        <div className="w-full">
            <div className="w-full">
            <QueryClientProvider client={queryClient}>
                <SelectProvider>
                    <DinamicSelect selectValue="drinks" type="drinksSelect" />
                    <DrinkCards drinkQuery="drinks"/>
                </SelectProvider>
                <Toaster position="top-center" />
            </QueryClientProvider>
        </div>
        </div>
    )
}

export default page