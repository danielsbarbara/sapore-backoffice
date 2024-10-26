"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import { DinamicSelect } from "../_components/DinamicSelect"
import { SelectProvider } from "../_components/SelectContext"
import { DrinkCards } from "../_components/DrinkCards"

const queryClient = new QueryClient()

const page: React.FC = () => {
    return (
        <div className="w-full">
            <QueryClientProvider client={queryClient}>
                <SelectProvider>
                    <DinamicSelect selectValue="wines" type="winesSelect" />
                    <DrinkCards/>
                </SelectProvider>
            </QueryClientProvider>
        </div>
    )
}

export default page