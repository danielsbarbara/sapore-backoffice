import { updateMenu, updateMenuTipsOfDay } from "@/app/_server/CRUD";
import { NextRequest } from "next/server";

interface ReqType {
    day: string
    name: string
    price: string
    text: string
    originalName: string
}

export async function POST(req: NextRequest){
    const {day, name, price, text, originalName} = await req.json() as ReqType

    try{
        const isUpdatedTipsOfDay = await updateMenuTipsOfDay(day, name, price, text, originalName)
        const isUpdatedMenu = await updateMenu(name, price, text, originalName)
        if(!isUpdatedMenu && !isUpdatedTipsOfDay) Response.error()

        Response.json({message: true})
    } catch(e: unknown){

    }
    return Response.json({test: 'test'})
}