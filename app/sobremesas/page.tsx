"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import { DinamicSelect } from "../_components/DinamicSelect"
import { SelectProvider } from "../_components/SelectContext"
import { Box } from "../_components/Box"

const queryClient = new QueryClient()

const page: React.FC = () => {
    return (
        <div className="w-full">
            <QueryClientProvider client={queryClient}>
                <SelectProvider>
                    <DinamicSelect type="dessertsSelect" selectValue="sweets" />
                    <Box menuType="desserts" />
                </SelectProvider>
            </QueryClientProvider>
        </div>
    )
}

export default page