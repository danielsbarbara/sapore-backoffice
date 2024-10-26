"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import { Box } from "../_components/Box"
import { DinamicSelect } from "../_components/DinamicSelect"
import { SelectProvider } from "../_components/SelectContext"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()

const page: React.FC = () => {
    return (
        <div className="w-full">
            <QueryClientProvider client={queryClient}>
                <SelectProvider>
                    <DinamicSelect type="menuSelect" selectValue="entries" />
                    <Box menuType="menu" />
                </SelectProvider>
                <Toaster position="top-center" />
            </QueryClientProvider>
        </div>
    )
}

export default page