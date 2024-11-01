import { updateDrink } from "@/app/_server/CRUD";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface ReqType {
    oldName: string
    name: string
    price: string
    id: ObjectId
}

export async function POST(req: NextResponse){
    const {oldName, name, price, id} = await req.json() as ReqType
    try{
        const isUpdated = await updateDrink(oldName, name, price, id)
        if(!isUpdated) throw new Error('Ocorreu um erro a actualizar')
        return Response.json({result: isUpdated})
    }catch(err){
        return Response.json({result: err})
    }
}