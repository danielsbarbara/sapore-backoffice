import { updateDrink } from "@/app/_server/CRUD";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface ReqType {
    name: string
    price: string
    _id: ObjectId
}

export async function POST(req: NextResponse){
    const {name, price, _id} = await req.json() as ReqType
    try{
        const isUpdated = await updateDrink(name, price, _id)
        if(!isUpdated) throw new Error('Ocorreu um erro a actualizar')
        return Response.json({result: isUpdated})
    }catch(err){
        return Response.json({result: err})
    }
}