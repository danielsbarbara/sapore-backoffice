"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import { Box } from "../_components/Box"
import { DinamicSelect } from "../_components/DinamicSelect"
import { SelectProvider } from "../_components/SelectContext"

const queryClient = new QueryClient()

const page: React.FC = () => {
    return (
        <div className="bg-red-300 w-full">
            <QueryClientProvider client={queryClient}>
                <SelectProvider>
                    <DinamicSelect type="menuSelect" selectValue="entries" />
                    <Box menuType="menu" />
                </SelectProvider>
            </QueryClientProvider>
        </div>
    )
}

export default page