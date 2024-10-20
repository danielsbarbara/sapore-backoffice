"use client"

import { QueryClient, QueryClientProvider } from "react-query"
import { SelectProvider } from "../_components/SelectContext"
import { DinamicSelect } from "../_components/DinamicSelect"
import { Box } from "../_components/Box"

const queryClient = new QueryClient()
const page: React.FC = () => {
    return (
        <div className="bg-red-300 w-full">
        </div>
    )
}

export default page