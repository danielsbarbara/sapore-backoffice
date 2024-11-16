import { updateMenu, updateMenuTipsOfDay } from "@/app/_server/CRUD";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

interface ReqType {
    day: string
    name: string
    price: string
    text: string
    _id: ObjectId
}

export async function POST(req: NextRequest){
    const {day, name, price, text, _id} = await req.json() as ReqType

    try{
        const isUpdatedMenu = await updateMenu(name, price, text, _id)
        if(!isUpdatedMenu) Response.error()

        Response.json({message: true})
    } catch(e: unknown){

    }
    return Response.json({test: 'test'})
}